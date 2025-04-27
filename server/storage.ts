import { users, type User, type InsertUser, type Scan, type InsertScan, type Product, type InsertProduct } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

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
  sessionStore: session.SessionStore;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private scans: Map<number, Scan>;
  private products: Map<number, Product>;
  public sessionStore: session.SessionStore;
  
  private userIdCounter: number;
  private scanIdCounter: number;
  private productIdCounter: number;

  constructor() {
    this.users = new Map();
    this.scans = new Map();
    this.products = new Map();
    this.userIdCounter = 1;
    this.scanIdCounter = 1;
    this.productIdCounter = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Scan methods
  async createScan(insertScan: InsertScan): Promise<Scan> {
    const id = this.scanIdCounter++;
    const scanDate = new Date();
    const scan: Scan = { ...insertScan, id, scanDate };
    this.scans.set(id, scan);
    return scan;
  }

  async getScansByUserId(userId: number): Promise<Scan[]> {
    return Array.from(this.scans.values()).filter(
      (scan) => scan.userId === userId,
    ).sort((a, b) => b.scanDate.getTime() - a.scanDate.getTime());
  }

  async getScan(id: number): Promise<Scan | undefined> {
    return this.scans.get(id);
  }

  // Product methods
  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.productIdCounter++;
    const registrationDate = new Date();
    const product: Product = { ...insertProduct, id, registrationDate };
    this.products.set(id, product);
    return product;
  }

  async getProductByHash(blockchainHash: string): Promise<Product | undefined> {
    return Array.from(this.products.values()).find(
      (product) => product.blockchainHash === blockchainHash,
    );
  }

  async getProductsByBusinessId(businessId: number): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.businessId === businessId,
    );
  }
}

export const storage = new MemStorage();
