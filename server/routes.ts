import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { aiModel } from "./ai";
import multer from "multer";
import path from "path";
import fs from "fs";
import crypto from "crypto";

// Configure multer for file uploads
const storage_dest = path.join(process.cwd(), "uploads");
if (!fs.existsSync(storage_dest)) {
  fs.mkdirSync(storage_dest, { recursive: true });
}

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, storage_dest);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname);
      cb(null, uniqueSuffix + ext);
    },
  }),
  fileFilter: (req, file, cb) => {
    // Accept only image files
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max file size
  },
});

// Middleware to check if user is authenticated
const isAuthenticated = (req: Request, res: Response, next: Function) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication
  setupAuth(app);

  // Scan routes
  app.post("/api/scan/upload", isAuthenticated, upload.single("image"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // Get the file path
      const imagePath = req.file.path;
      
      // Read the image buffer
      const imageBuffer = fs.readFileSync(imagePath);
      
      // Generate a blockchain hash from the image
      const imageHash = crypto.createHash('sha256')
        .update(imageBuffer)
        .digest('hex');
      
      // Check if this is a registered product
      const product = await storage.getProductByHash(imageHash);
      
      // Check for duplicate scans with similar hash (potential counterfeit detection)
      // This simplified approach just checks the DB for the exact hash
      // In a real system, we would use perceptual hashing or image similarity
      const previousScans = await storage.getScansWithHash(imageHash);
      const isDuplicate = previousScans.length > 0 && 
        previousScans.some(s => s.userId !== req.user!.id);
      
      // Analyze the image with AI - passing the duplicate flag to adjust scores
      const analysisResult = await aiModel.analyzeImage(imageBuffer, isDuplicate);
      
      // Create a scan record
      const scan = await storage.createScan({
        userId: req.user!.id,
        productName: req.body.productName || (product ? product.name : "Unknown Product"),
        imagePath: req.file.filename,
        scanType: "image",
        trustScore: analysisResult.trustScore,
        isAuthentic: analysisResult.isAuthentic,
        logoScore: analysisResult.logoScore,
        textureScore: analysisResult.textureScore,
        barcodeScore: analysisResult.barcodeScore,
        blockchainVerified: !!product && !isDuplicate,
        blockchainHash: imageHash
      });
      
      // Return the scan result with duplicate information
      res.status(200).json({
        scan,
        analysis: analysisResult,
        isDuplicate: isDuplicate,
        product: product
      });
    } catch (error) {
      console.error("Error during scan:", error);
      res.status(500).json({ message: "Failed to process scan" });
    }
  });

  // Get user's scan history
  app.get("/api/scans", isAuthenticated, async (req, res) => {
    try {
      const scans = await storage.getScansByUserId(req.user!.id);
      res.status(200).json(scans);
    } catch (error) {
      console.error("Error fetching scans:", error);
      res.status(500).json({ message: "Failed to fetch scan history" });
    }
  });

  // Get specific scan details
  app.get("/api/scan/:id", isAuthenticated, async (req, res) => {
    try {
      const scanId = parseInt(req.params.id);
      if (isNaN(scanId)) {
        return res.status(400).json({ message: "Invalid scan ID" });
      }
      
      const scan = await storage.getScan(scanId);
      if (!scan) {
        return res.status(404).json({ message: "Scan not found" });
      }
      
      if (scan.userId !== req.user!.id) {
        return res.status(403).json({ message: "Unauthorized to access this scan" });
      }
      
      res.status(200).json(scan);
    } catch (error) {
      console.error("Error fetching scan:", error);
      res.status(500).json({ message: "Failed to fetch scan details" });
    }
  });

  // Product routes (for businesses)
  app.post("/api/product/register", isAuthenticated, async (req, res) => {
    try {
      if (req.user!.userType !== "business") {
        return res.status(403).json({ message: "Only businesses can register products" });
      }
      
      // Generate a blockchain hash
      const blockchainHash = crypto.createHash('sha256')
        .update(req.body.name + Date.now().toString())
        .digest('hex');
      
      const product = await storage.createProduct({
        businessId: req.user!.id,
        name: req.body.name,
        description: req.body.description || "",
        blockchainHash
      });
      
      res.status(201).json(product);
    } catch (error) {
      console.error("Error registering product:", error);
      res.status(500).json({ message: "Failed to register product" });
    }
  });

  // Get business products
  app.get("/api/products", isAuthenticated, async (req, res) => {
    try {
      if (req.user!.userType !== "business") {
        return res.status(403).json({ message: "Only businesses can access products" });
      }
      
      const products = await storage.getProductsByBusinessId(req.user!.id);
      res.status(200).json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  // QR Code scan
  app.post("/api/scan/qr", isAuthenticated, async (req, res) => {
    try {
      const { qrData } = req.body;
      if (!qrData) {
        return res.status(400).json({ message: "No QR code data provided" });
      }
      
      // Check if product exists with this blockchain hash
      const product = await storage.getProductByHash(qrData);
      
      // Check for duplicate scans of this hash (potential counterfeit detection)
      const previousScans = await storage.getScansWithHash(qrData);
      const isDuplicate = previousScans.length > 0 && 
        previousScans.some(s => s.userId !== req.user!.id);
      
      // Generate analysis result
      let trustScore = 0;
      let isAuthentic = false;
      
      if (product) {
        if (isDuplicate) {
          // Product exists in database but has been scanned by others - potential counterfeit
          trustScore = Math.floor(Math.random() * 20) + 40; // 40-60 score for duplicates
          isAuthentic = false;
        } else {
          // Legitimate product
          trustScore = Math.floor(Math.random() * 15) + 85; // 85-100 score for authentic
          isAuthentic = true;
        }
      } else {
        // Not in our database at all
        trustScore = Math.floor(Math.random() * 30) + 20; // 20-50 score for unknown
        isAuthentic = false;
      }
      
      // Create scan record
      const scan = await storage.createScan({
        userId: req.user!.id,
        productName: product ? product.name : "Unknown Product",
        imagePath: "",
        scanType: "qr",
        trustScore,
        isAuthentic,
        logoScore: 0,
        textureScore: 0,
        barcodeScore: trustScore,
        blockchainVerified: !!product && !isDuplicate,
        blockchainHash: qrData
      });
      
      res.status(200).json({
        scan,
        product,
        verified: !!product && !isDuplicate,
        isDuplicate: isDuplicate
      });
    } catch (error) {
      console.error("Error processing QR scan:", error);
      res.status(500).json({ message: "Failed to process QR code" });
    }
  });

  // Blockchain verification
  app.post("/api/verify/blockchain", isAuthenticated, async (req, res) => {
    try {
      const { hash } = req.body;
      if (!hash) {
        return res.status(400).json({ message: "No blockchain hash provided" });
      }
      
      // For MVP, we'll check if the hash exists in our product database
      const product = await storage.getProductByHash(hash);
      
      // Check for duplicate scans of this hash (potential counterfeit detection)
      const previousScans = await storage.getScansWithHash(hash);
      const isDuplicate = previousScans.length > 0 && 
        previousScans.some(s => s.userId !== req.user!.id);
      
      // Create a scan record for this verification
      if (product || hash.length >= 32) { // Only create scan for valid-looking hashes
        await storage.createScan({
          userId: req.user!.id,
          productName: product ? product.name : "Unknown Product",
          imagePath: "",
          scanType: "blockchain",
          trustScore: product ? (isDuplicate ? 45 : 95) : 30,
          isAuthentic: product ? !isDuplicate : false,
          logoScore: 0,
          textureScore: 0,
          barcodeScore: 0,
          blockchainVerified: !!product && !isDuplicate,
          blockchainHash: hash
        });
      }
      
      res.status(200).json({
        verified: !!product && !isDuplicate,
        product,
        isDuplicate: isDuplicate,
        duplicateScans: isDuplicate ? previousScans.length : 0
      });
    } catch (error) {
      console.error("Error verifying blockchain:", error);
      res.status(500).json({ message: "Failed to verify blockchain hash" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
