import { pgTable, text, serial, timestamp, boolean } from "drizzle-orm/pg-core";
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

export const insertFaqSchema = createInsertSchema(faqs).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;
export type InsertFaq = z.infer<typeof insertFaqSchema>;
export type Faq = typeof faqs.$inferSelect;
