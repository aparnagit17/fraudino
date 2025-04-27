import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull(),
  userType: text("user_type").notNull().default("consumer"), // 'consumer' or 'business'
});

export const scans = pgTable("scans", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  productName: text("product_name"),
  imagePath: text("image_path"),
  scanType: text("scan_type").notNull(), // 'image', 'qr', 'nfc', 'rfid'
  trustScore: integer("trust_score"),
  isAuthentic: boolean("is_authentic"),
  logoScore: integer("logo_score"),
  textureScore: integer("texture_score"),
  barcodeScore: integer("barcode_score"),
  blockchainVerified: boolean("blockchain_verified").default(false),
  scanDate: timestamp("scan_date").notNull().defaultNow(),
  blockchainHash: text("blockchain_hash"),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  businessId: integer("business_id").notNull(),
  name: text("name").notNull(),
  description: text("description"),
  blockchainHash: text("blockchain_hash"),
  registrationDate: timestamp("registration_date").notNull().defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  userType: true
}).extend({
  password: z.string().min(6, "Password must be at least 6 characters"),
  email: z.string().email("Invalid email address")
});

export const insertScanSchema = createInsertSchema(scans).pick({
  userId: true,
  productName: true,
  imagePath: true,
  scanType: true,
  trustScore: true,
  isAuthentic: true,
  logoScore: true,
  textureScore: true,
  barcodeScore: true,
  blockchainVerified: true,
  blockchainHash: true
});

export const insertProductSchema = createInsertSchema(products).pick({
  businessId: true,
  name: true,
  description: true,
  blockchainHash: true
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertScan = z.infer<typeof insertScanSchema>;
export type Scan = typeof scans.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

// Login schema for frontend validation
export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required")
});

export type LoginData = z.infer<typeof loginSchema>;
