import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertFaqSchema, insertPackageSchema, insertPackageProductSchema, insertAdminSchema } from "@shared/schema";
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
      const { email, password } = req.body;
      
      // 관리자 이메일 확인
      const adminEmail = 'okaypark7@gmail.com';
      if (email !== adminEmail) {
        return res.status(401).json({
          success: false,
          message: "관리자 권한이 없습니다."
        });
      }
      
      // 관리자 계정 정보 가져오기
      const admin = await storage.getAdminByEmail(email);
      if (!admin) {
        return res.status(401).json({
          success: false,
          message: "관리자 계정을 찾을 수 없습니다."
        });
      }
      
      // 비밀번호 확인
      const isValidPassword = await bcrypt.compare(password, admin.passwordHash);
      if (!isValidPassword) {
        return res.status(401).json({
          success: false,
          message: "잘못된 비밀번호입니다."
        });
      }
      
      // 세션에 관리자 인증 정보 저장
      (req.session as any).isAdminAuthenticated = true;
      (req.session as any).adminEmail = email;
      
      console.log('로그인 세션 설정:', {
        sessionId: req.sessionID,
        isAdminAuthenticated: true,
        adminEmail: email
      });
      
      // 세션 저장 후 응답
      req.session.save((err) => {
        if (err) {
          console.error('세션 저장 오류:', err);
          return res.status(500).json({
            success: false,
            message: "세션 저장 중 오류가 발생했습니다."
          });
        }
        
        console.log('세션 저장 완료');
        res.json({
          success: true,
          message: "로그인 성공",
          admin: { email, name: admin.name }
        });
      });
    } catch (error) {
      console.error("관리자 로그인 오류:", error);
      res.status(500).json({
        success: false,
        message: "서버 오류가 발생했습니다."
      });
    }
  });

  // 관리자 로그아웃 API
  app.post("/api/admin/logout", (req, res) => {
    (req.session as any).isAdminAuthenticated = false;
    (req.session as any).adminEmail = null;
    req.session?.destroy((err) => {
      if (err) {
        console.error('세션 삭제 오류:', err);
        return res.status(500).json({ success: false, message: "로그아웃 중 오류가 발생했습니다." });
      }
      res.json({ success: true, message: "로그아웃 성공" });
    });
  });

  // 관리자 인증 상태 확인 API
  app.get("/api/admin/status", (req, res) => {
    const session = req.session as any;
    const isAuthenticated = !!(session?.isAdminAuthenticated && session?.adminEmail);
    console.log('인증 상태 확인:', { 
      sessionId: req.sessionID,
      isAdminAuthenticated: session?.isAdminAuthenticated,
      adminEmail: session?.adminEmail,
      결과: isAuthenticated 
    });
    res.json({ isAuthenticated });
  });

  // 비밀번호 재설정 요청 API
  app.post("/api/admin/password-reset", async (req, res) => {
    try {
      const { email } = req.body;
      
      // 실제 환경에서는 이메일 발송 서비스 연동
      // 여기서는 시뮬레이션으로 처리
      console.log(`📧 비밀번호 재설정 이메일 발송 요청: ${email}`);
      
      // 실제로는 임시 토큰을 생성하고 이메일로 재설정 링크 발송
      // const resetToken = crypto.randomBytes(32).toString('hex');
      // await sendPasswordResetEmail(email, resetToken);
      
      res.json({ 
        success: true, 
        message: "비밀번호 재설정 링크가 이메일로 발송되었습니다." 
      });
    } catch (error) {
      console.error('비밀번호 재설정 요청 오류:', error);
      res.status(500).json({ 
        success: false, 
        message: "비밀번호 재설정 요청 처리 중 오류가 발생했습니다." 
      });
    }
  });

  // 비밀번호 변경 API
  app.post("/api/admin/change-password", requireAdminAuth, async (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body;
      const adminEmail = (req.session as any).adminEmail;
      
      if (!currentPassword || !newPassword) {
        return res.status(400).json({
          success: false,
          message: "현재 비밀번호와 새 비밀번호를 입력해주세요."
        });
      }
      
      // 관리자 계정 정보 가져오기
      const admin = await storage.getAdminByEmail(adminEmail);
      if (!admin) {
        return res.status(404).json({
          success: false,
          message: "관리자 계정을 찾을 수 없습니다."
        });
      }
      
      // 현재 비밀번호 확인
      const isCurrentPasswordValid = await bcrypt.compare(currentPassword, admin.passwordHash);
      if (!isCurrentPasswordValid) {
        return res.status(401).json({
          success: false,
          message: "현재 비밀번호가 일치하지 않습니다."
        });
      }
      
      // 새 비밀번호 유효성 검증
      if (newPassword.length < 6) {
        return res.status(400).json({
          success: false,
          message: "새 비밀번호는 최소 6자 이상이어야 합니다."
        });
      }
      
      // 새 비밀번호 해시 생성
      const newPasswordHash = await bcrypt.hash(newPassword, 10);
      
      // 데이터베이스에 새 비밀번호 업데이트
      const updated = await storage.updateAdminPassword(adminEmail, newPasswordHash);
      
      if (!updated) {
        return res.status(500).json({
          success: false,
          message: "비밀번호 업데이트에 실패했습니다."
        });
      }
      
      res.json({
        success: true,
        message: "비밀번호가 성공적으로 변경되었습니다."
      });
    } catch (error) {
      console.error('비밀번호 변경 오류:', error);
      res.status(500).json({
        success: false,
        message: "비밀번호 변경 중 오류가 발생했습니다."
      });
    }
  });

  // 관리자 추가 API
  app.post("/api/admin/add", requireAdminAuth, async (req, res) => {
    try {
      const { email, name, password } = req.body;

      // 입력 데이터 유효성 검증
      if (!email || !name || !password) {
        return res.status(400).json({
          success: false,
          message: "이메일, 이름, 비밀번호를 모두 입력해주세요."
        });
      }

      if (password.length < 8) {
        return res.status(400).json({
          success: false,
          message: "비밀번호는 최소 8자 이상이어야 합니다."
        });
      }

      // 이미 존재하는 관리자인지 확인
      const existingAdmin = await storage.getAdminByEmail(email);
      if (existingAdmin) {
        return res.status(409).json({
          success: false,
          message: "이미 등록된 이메일입니다."
        });
      }

      // 비밀번호 해시 생성
      const passwordHash = await bcrypt.hash(password, 10);

      // 새 관리자 추가
      const newAdmin = await storage.createAdmin({
        email,
        name,
        passwordHash
      });

      res.json({
        success: true,
        message: "관리자가 성공적으로 추가되었습니다.",
        admin: {
          id: newAdmin.id,
          email: newAdmin.email,
          name: newAdmin.name
        }
      });
    } catch (error) {
      console.error('관리자 추가 오류:', error);
      res.status(500).json({
        success: false,
        message: "관리자 추가 중 오류가 발생했습니다."
      });
    }
  });

  // 관리자 목록 조회 API
  app.get("/api/admin/list", requireAdminAuth, async (req, res) => {
    try {
      const admins = await storage.getAllAdmins();
      res.json({
        success: true,
        admins: admins.map(admin => ({
          id: admin.id,
          email: admin.email,
          name: admin.name,
          createdAt: admin.createdAt
        }))
      });
    } catch (error) {
      console.error('관리자 목록 조회 오류:', error);
      res.status(500).json({
        success: false,
        message: "관리자 목록 조회 중 오류가 발생했습니다."
      });
    }
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
