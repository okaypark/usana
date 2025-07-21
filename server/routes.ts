import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";
import { googleSheetsService } from "./google-sheets";
import bcrypt from "bcryptjs";
import session from "express-session";

// 관리자 인증 미들웨어
const requireAdminAuth = (req: any, res: any, next: any) => {
  if (!req.session?.isAdminAuthenticated) {
    return res.status(401).json({ success: false, message: "관리자 인증이 필요합니다." });
  }
  next();
};

export async function registerRoutes(app: Express): Promise<Server> {
  // 세션 설정
  app.use(session({
    secret: process.env.SESSION_SECRET || 'usana-admin-secret-key-2025',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // development에서는 false
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24시간
    }
  }));

  // 관리자 로그인 API
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      // 환경변수에서 관리자 계정 정보 가져오기
      const adminUsername = process.env.ADMIN_USERNAME || 'admin';
      const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
      
      if (!adminPasswordHash) {
        return res.status(500).json({ 
          success: false, 
          message: "관리자 계정이 설정되지 않았습니다." 
        });
      }
      
      // 사용자명 확인
      if (username !== adminUsername) {
        return res.status(401).json({ 
          success: false, 
          message: "잘못된 계정 정보입니다." 
        });
      }
      
      // 비밀번호 확인
      const isPasswordValid = await bcrypt.compare(password, adminPasswordHash);
      if (!isPasswordValid) {
        return res.status(401).json({ 
          success: false, 
          message: "잘못된 계정 정보입니다." 
        });
      }
      
      // 세션에 인증 정보 저장
      (req.session as any).isAdminAuthenticated = true;
      
      res.json({ success: true, message: "로그인 성공" });
    } catch (error) {
      console.error('관리자 로그인 오류:', error);
      res.status(500).json({ success: false, message: "로그인 처리 중 오류가 발생했습니다." });
    }
  });

  // 관리자 로그아웃 API
  app.post("/api/admin/logout", (req, res) => {
    (req.session as any).isAdminAuthenticated = false;
    req.session?.destroy(() => {
      res.json({ success: true, message: "로그아웃 성공" });
    });
  });

  // 관리자 인증 상태 확인 API
  app.get("/api/admin/status", (req, res) => {
    const isAuthenticated = !!(req.session as any)?.isAdminAuthenticated;
    res.json({ isAuthenticated });
  });
  // Contact form submission
  app.post("/api/contacts", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      
      // 로컬 저장소에 저장
      const contact = await storage.createContact(contactData);
      
      // Google Sheets에 저장 및 이메일 알림 발송
      try {
        await googleSheetsService.addContactToSheet(contactData);
        console.log('✅ 상담신청이 Google Sheets에 저장되고 이메일 알림이 발송되었습니다.');
      } catch (sheetsError) {
        console.error('⚠️ Google Sheets 연동 실패:', sheetsError);
        // Google Sheets 실패해도 상담신청 자체는 성공으로 처리
      }
      
      res.json({ success: true, contact });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, errors: error.errors });
      } else {
        console.error('상담신청 처리 오류:', error);
        res.status(500).json({ success: false, message: "Failed to submit contact form" });
      }
    }
  });

  // Get all contacts (for admin purposes)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to get contacts" });
    }
  });

  // Update contact status
  app.patch("/api/contacts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      const { isContacted } = req.body;
      
      if (isNaN(id)) {
        return res.status(400).json({ success: false, message: "Invalid contact ID" });
      }

      const contact = await storage.updateContactStatus(id, Boolean(isContacted));
      if (!contact) {
        return res.status(404).json({ success: false, message: "Contact not found" });
      }

      res.json({ success: true, contact });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to update contact" });
    }
  });

  // Get FAQs
  app.get("/api/faqs", async (req, res) => {
    try {
      const faqs = await storage.getFaqs();
      res.json(faqs);
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to get FAQs" });
    }
  });

  // Create FAQ (for admin purposes)
  app.post("/api/faqs", async (req, res) => {
    try {
      const faqData = req.body;
      const faq = await storage.createFaq(faqData);
      res.json({ success: true, faq });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to create FAQ" });
    }
  });

  // 공개 패키지 목록 조회 (홈페이지용)
  app.get("/api/public/packages", async (req, res) => {
    try {
      const packages = await storage.getPackages();
      res.json(packages);
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to get packages" });
    }
  });

  // 공개 패키지 제품 조회 (홈페이지용)
  app.get("/api/public/packages/:packageId/products", async (req, res) => {
    try {
      const packageId = parseInt(req.params.packageId, 10);
      if (isNaN(packageId)) {
        return res.status(400).json({ success: false, message: "Invalid package ID" });
      }
      
      const products = await storage.getPackageProducts(packageId);
      res.json(products);
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to get package products" });
    }
  });

  // 패키지 관리 API (관리자 인증 필요)
  app.get("/api/packages", requireAdminAuth, async (req, res) => {
    try {
      const packages = await storage.getPackages();
      res.json(packages);
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to get packages" });
    }
  });

  app.get("/api/packages/theme/:theme", requireAdminAuth, async (req, res) => {
    try {
      const { theme } = req.params;
      const packages = await storage.getPackagesByTheme(theme);
      res.json(packages);
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to get packages by theme" });
    }
  });

  app.get("/api/packages/:id", requireAdminAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ success: false, message: "Invalid package ID" });
      }
      
      const pkg = await storage.getPackageById(id);
      if (!pkg) {
        return res.status(404).json({ success: false, message: "Package not found" });
      }
      
      res.json(pkg);
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to get package" });
    }
  });

  app.post("/api/packages", requireAdminAuth, async (req, res) => {
    try {
      const packageData = req.body;
      const pkg = await storage.createPackage(packageData);
      res.json({ success: true, package: pkg });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to create package" });
    }
  });

  app.put("/api/packages/:id", requireAdminAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ success: false, message: "Invalid package ID" });
      }
      
      const packageData = req.body;
      const pkg = await storage.updatePackage(id, packageData);
      if (!pkg) {
        return res.status(404).json({ success: false, message: "Package not found" });
      }
      
      res.json({ success: true, package: pkg });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to update package" });
    }
  });

  app.delete("/api/packages/:id", requireAdminAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ success: false, message: "Invalid package ID" });
      }
      
      const success = await storage.deletePackage(id);
      if (!success) {
        return res.status(404).json({ success: false, message: "Package not found" });
      }
      
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to delete package" });
    }
  });

  // 패키지 제품 관리 API (관리자 인증 필요)
  app.get("/api/packages/:packageId/products", requireAdminAuth, async (req, res) => {
    try {
      const packageId = parseInt(req.params.packageId, 10);
      if (isNaN(packageId)) {
        return res.status(400).json({ success: false, message: "Invalid package ID" });
      }
      
      const products = await storage.getPackageProducts(packageId);
      res.json(products);
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to get package products" });
    }
  });

  app.post("/api/packages/:packageId/products", requireAdminAuth, async (req, res) => {
    try {
      const packageId = parseInt(req.params.packageId, 10);
      if (isNaN(packageId)) {
        return res.status(400).json({ success: false, message: "Invalid package ID" });
      }
      
      const productData = { ...req.body, packageId };
      const product = await storage.createPackageProduct(productData);
      res.json({ success: true, product });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to create package product" });
    }
  });

  app.put("/api/package-products/:id", requireAdminAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ success: false, message: "Invalid product ID" });
      }
      
      const productData = req.body;
      const product = await storage.updatePackageProduct(id, productData);
      if (!product) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }
      
      res.json({ success: true, product });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to update package product" });
    }
  });

  app.delete("/api/package-products/:id", requireAdminAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ success: false, message: "Invalid product ID" });
      }
      
      const success = await storage.deletePackageProduct(id);
      if (!success) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }
      
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to delete package product" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
