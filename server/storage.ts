import { 
  users, 
  scans, 
  products, 
  type User, 
  type InsertUser, 
  type Scan, 
  type InsertScan, 
  type Product, 
  type InsertProduct 
} from "@shared/schema";
import expressSession from "express-session";
import connectPgSimple from "connect-pg-simple";
import { db, pool } from "./db";
import { eq } from "drizzle-orm";

// Create session store with express-session
const PostgresStore = connectPgSimple(expressSession);

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Scan methods
  createScan(scan: InsertScan): Promise<Scan>;
  getScansByUserId(userId: number): Promise<Scan[]>;
  getScan(id: number): Promise<Scan | undefined>;
  
  // Product methods
  createProduct(product: InsertProduct): Promise<Product>;
  getProductByHash(blockchainHash: string): Promise<Product | undefined>;
  getProductsByBusinessId(businessId: number): Promise<Product[]>;
  
  // Session store
  sessionStore: expressSession.Store;
}

export class DatabaseStorage implements IStorage {
  public sessionStore: expressSession.Store;

  constructor() {
    this.sessionStore = new PostgresStore({
      pool,
      createTableIfMissing: true,
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values({
        username: insertUser.username,
        password: insertUser.password,
        email: insertUser.email,
        userType: insertUser.userType
      })
      .returning();
    return user;
  }

  // Scan methods
  async createScan(insertScan: InsertScan): Promise<Scan> {
    const [scan] = await db
      .insert(scans)
      .values({
        userId: insertScan.userId,
        productName: insertScan.productName || null,
        imagePath: insertScan.imagePath || null,
        scanType: insertScan.scanType,
        trustScore: insertScan.trustScore || null,
        isAuthentic: insertScan.isAuthentic || null,
        logoScore: insertScan.logoScore || null,
        textureScore: insertScan.textureScore || null,
        barcodeScore: insertScan.barcodeScore || null,
        blockchainVerified: insertScan.blockchainVerified || false,
        blockchainHash: insertScan.blockchainHash || null
      })
      .returning();
    return scan;
  }

  async getScansByUserId(userId: number): Promise<Scan[]> {
    return db
      .select()
      .from(scans)
      .where(eq(scans.userId, userId))
      .orderBy(scans.scanDate);
  }

  async getScan(id: number): Promise<Scan | undefined> {
    const [scan] = await db.select().from(scans).where(eq(scans.id, id));
    return scan || undefined;
  }

  // Product methods
  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const [product] = await db
      .insert(products)
      .values({
        businessId: insertProduct.businessId,
        name: insertProduct.name,
        description: insertProduct.description || null,
        blockchainHash: insertProduct.blockchainHash || null
      })
      .returning();
    return product;
  }

  async getProductByHash(blockchainHash: string): Promise<Product | undefined> {
    const [product] = await db
      .select()
      .from(products)
      .where(eq(products.blockchainHash, blockchainHash));
    return product || undefined;
  }

  async getProductsByBusinessId(businessId: number): Promise<Product[]> {
    return db
      .select()
      .from(products)
      .where(eq(products.businessId, businessId));
  }
}

export const storage = new DatabaseStorage();
