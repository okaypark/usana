import { pgTable, text, serial, timestamp, boolean, decimal, integer, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  interest: text("interest").notNull(),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  isContacted: boolean("is_contacted").default(false).notNull(),
});

export const faqs = pgTable("faqs", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  category: text("category").notNull(),
  order: serial("order").notNull(),
});

// 패키지 관리 테이블
export const packages = pgTable("packages", {
  id: serial("id").primaryKey(),
  theme: text("theme").notNull(), // 면역건강구독, 해독다이어트구독, 피부건강구독
  type: text("type").notNull(), // standard, premium
  name: text("name").notNull(),
  description: text("description"),
  totalPrice: text("total_price").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 패키지별 제품 정보 테이블
export const packageProducts = pgTable("package_products", {
  id: serial("id").primaryKey(),
  packageId: integer("package_id").notNull().references(() => packages.id),
  productName: text("product_name").notNull(),
  productDescription: text("product_description"),
  price: text("price").notNull(),
  pointValue: integer("point_value"), // USANA 포인트 값
  order: integer("order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  createdAt: true,
  isContacted: true,
}).extend({
  name: z.string().min(1, "이름을 입력해주세요").min(2, "이름은 최소 2글자 이상 입력해주세요"),
  phone: z.string()
    .min(1, "전화번호를 입력해주세요")
    .regex(/^[0-9-]+$/, "올바른 전화번호 형식으로 입력해주세요")
    .min(10, "전화번호는 최소 10자리 이상 입력해주세요"),
  email: z.string().email("올바른 이메일 형식으로 입력해주세요").optional().or(z.literal("")),
  interest: z.string().min(1, "관심 분야를 선택해주세요"),
  message: z.string().optional()
});

// 관리자 테이블
export const admins = pgTable("admins", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertFaqSchema = createInsertSchema(faqs).omit({
  id: true,
});

export const insertPackageSchema = createInsertSchema(packages).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPackageProductSchema = createInsertSchema(packageProducts).omit({
  id: true,
  createdAt: true,
});

export const insertAdminSchema = createInsertSchema(admins).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  email: z.string().email("올바른 이메일 형식으로 입력해주세요"),
  name: z.string().min(1, "이름을 입력해주세요"),
  password: z.string().min(8, "비밀번호는 최소 8자 이상이어야 합니다"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;
export type InsertFaq = z.infer<typeof insertFaqSchema>;
export type Faq = typeof faqs.$inferSelect;
export type InsertPackage = z.infer<typeof insertPackageSchema>;
export type Package = typeof packages.$inferSelect;
export type InsertPackageProduct = z.infer<typeof insertPackageProductSchema>;
export type PackageProduct = typeof packageProducts.$inferSelect;
export type InsertAdmin = z.infer<typeof insertAdminSchema>;
export type Admin = typeof admins.$inferSelect;
