import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertFaqSchema, insertPackageSchema, insertPackageProductSchema, insertAdminSchema } from "@shared/schema";
import { z } from "zod";
import { googleSheetsService } from "./google-sheets";
import bcrypt from "bcryptjs";
import session from "express-session";
import multer from "multer";
import path from "path";
import fs from "fs";
import express from "express";

// 관리자 인증 미들웨어
const requireAdminAuth = (req: any, res: any, next: any) => {
  if (!req.session?.isAdminAuthenticated) {
    return res.status(401).json({ success: false, message: "관리자 인증이 필요합니다." });
  }
  next();
};

export async function registerRoutes(app: Express): Promise<Server> {
  // 업로드 디렉토리 생성
  const uploadDir = path.join(process.cwd(), 'uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  // Multer 설정
  const storage_multer = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, 'hero-' + uniqueSuffix + path.extname(file.originalname));
    }
  });

  const upload = multer({ 
    storage: storage_multer,
    fileFilter: (req, file, cb) => {
      // 이미지 파일만 허용
      if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(new Error('이미지 파일만 업로드 가능합니다.'));
      }
    },
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB 제한
    }
  });

  // 업로드된 파일에 정적 접근 허용
  app.use('/uploads', express.static(uploadDir));

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
      
      console.log('로그인 시도:', { email, password: password ? '***' : 'empty' });
      
      // 관리자 계정 정보 가져오기
      const admin = await storage.getAdminByEmail(email);
      console.log('조회된 관리자:', admin ? { id: admin.id, email: admin.email, name: admin.name } : 'not found');
      
      if (!admin) {
        return res.status(401).json({
          success: false,
          message: "관리자 권한이 없습니다."
        });
      }
      
      // 비밀번호 확인
      const isValidPassword = await bcrypt.compare(password, admin.passwordHash);
      console.log('비밀번호 검증 결과:', isValidPassword);
      
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
      
      // 관리자 존재 여부 확인
      const admin = await storage.getAdminByEmail(email);
      if (!admin) {
        return res.status(404).json({
          success: false,
          message: "해당 이메일로 등록된 관리자를 찾을 수 없습니다."
        });
      }
      
      console.log(`📧 비밀번호 재설정 이메일 발송 요청: ${email}`);
      
      // 현재는 이메일 발송 서비스가 설정되지 않음
      // SENDGRID_API_KEY가 필요함
      res.status(503).json({ 
        success: false, 
        message: "이메일 발송 서비스가 설정되지 않았습니다. 관리자에게 문의하거나 로그인 후 비밀번호를 변경해주세요." 
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

  // 현재 관리자 정보 조회 API
  app.get("/api/admin/current", requireAdminAuth, async (req, res) => {
    try {
      const adminEmail = (req.session as any).adminEmail;
      const admin = await storage.getAdminByEmail(adminEmail);
      
      if (admin) {
        res.json({
          success: true,
          admin: {
            id: admin.id,
            email: admin.email,
            name: admin.name
          }
        });
      } else {
        res.status(404).json({
          success: false,
          message: "관리자 정보를 찾을 수 없습니다."
        });
      }
    } catch (error) {
      console.error('현재 관리자 정보 조회 오류:', error);
      res.status(500).json({
        success: false,
        message: "관리자 정보 조회 중 오류가 발생했습니다."
      });
    }
  });

  // 관리자 삭제 API (주 관리자만 가능)
  app.delete("/api/admin/:id", requireAdminAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const adminEmail = (req.session as any).adminEmail;
      
      // 주 관리자만 삭제 권한 있음
      if (adminEmail !== 'okaypark7@gmail.com') {
        return res.status(403).json({
          success: false,
          message: "주 관리자만 다른 관리자를 삭제할 수 있습니다."
        });
      }

      // 자기 자신은 삭제할 수 없음
      const targetAdmin = await storage.getAdminById(parseInt(id));
      if (targetAdmin?.email === 'okaypark7@gmail.com') {
        return res.status(400).json({
          success: false,
          message: "주 관리자는 삭제할 수 없습니다."
        });
      }

      const deleted = await storage.deleteAdmin(parseInt(id));
      
      if (deleted) {
        res.json({
          success: true,
          message: "관리자가 성공적으로 삭제되었습니다."
        });
      } else {
        res.status(404).json({
          success: false,
          message: "삭제할 관리자를 찾을 수 없습니다."
        });
      }
    } catch (error) {
      console.error('관리자 삭제 오류:', error);
      res.status(500).json({
        success: false,
        message: "관리자 삭제 중 오류가 발생했습니다."
      });
    }
  });

  // Contact form submission
  app.post("/api/contacts", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      
      // 로컬 저장소에 저장
      const contact = await storage.createContact(contactData);
      
      // 알림 이메일 주소 가져오기
      const notificationEmailSetting = await storage.getSiteSetting('notification_email');
      const notificationEmail = notificationEmailSetting?.value || 'okaypark7@gmail.com';
      
      console.log(`📧 상담 신청 알림을 ${notificationEmail}로 전송해야 합니다:`, {
        이름: contactData.name,
        전화번호: contactData.phone,
        이메일: contactData.email,
        관심분야: contactData.interest,
        메시지: contactData.message
      });
      
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
  app.post("/api/faqs", requireAdminAuth, async (req, res) => {
    try {
      const faqData = insertFaqSchema.parse(req.body);
      const faq = await storage.createFaq(faqData);
      res.json({ success: true, faq });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, errors: error.errors });
      } else {
        console.error('FAQ 생성 오류:', error);
        res.status(500).json({ success: false, message: "Failed to create FAQ" });
      }
    }
  });

  // Update FAQ
  app.put("/api/faqs/:id", requireAdminAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ success: false, message: "Invalid FAQ ID" });
      }

      const faqData = insertFaqSchema.parse(req.body);
      const faq = await storage.updateFaq(id, faqData);
      
      if (!faq) {
        return res.status(404).json({ success: false, message: "FAQ not found" });
      }

      res.json({ success: true, faq });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, errors: error.errors });
      } else {
        console.error('FAQ 수정 오류:', error);
        res.status(500).json({ success: false, message: "Failed to update FAQ" });
      }
    }
  });

  // Delete FAQ
  app.delete("/api/faqs/:id", requireAdminAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ success: false, message: "Invalid FAQ ID" });
      }

      const success = await storage.deleteFaq(id);
      if (!success) {
        return res.status(404).json({ success: false, message: "FAQ not found" });
      }

      res.json({ success: true });
    } catch (error) {
      console.error('FAQ 삭제 오류:', error);
      res.status(500).json({ success: false, message: "Failed to delete FAQ" });
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

  // 제품 수량 업데이트 API
  app.patch("/api/package-products/:id/quantity", requireAdminAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ success: false, message: "Invalid product ID" });
      }
      
      const { quantity } = req.body;
      if (typeof quantity !== 'number' || quantity < 1) {
        return res.status(400).json({ success: false, message: "Quantity must be a positive number" });
      }
      
      const success = await storage.updatePackageProductQuantity(id, quantity);
      if (!success) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }
      
      res.json({ success: true });
    } catch (error) {
      console.error('제품 수량 업데이트 오류:', error);
      res.status(500).json({ success: false, message: "Failed to update product quantity" });
    }
  });

  // 유사나 제품 스크래핑 API
  app.get("/api/usana/scrape", requireAdminAuth, async (req, res) => {
    try {
      const { scrapeUsanaProducts } = await import("./usana-scraper");
      
      console.log('유사나 제품 스크래핑 요청 받음');
      const products = await scrapeUsanaProducts();
      
      res.json({
        success: true,
        message: `${products.length}개의 제품 정보를 성공적으로 가져왔습니다.`,
        data: products,
        categoryCounts: products.reduce((acc, product) => {
          acc[product.category] = (acc[product.category] || 0) + 1;
          return acc;
        }, {} as Record<string, number>)
      });
    } catch (error) {
      console.error('유사나 제품 스크래핑 오류:', error);
      res.status(500).json({
        success: false,
        message: "제품 정보를 가져오는 중 오류가 발생했습니다.",
        error: error instanceof Error ? error.message : "알 수 없는 오류"
      });
    }
  });

  // 카테고리별 제품 필터링 API
  app.post("/api/usana/filter", requireAdminAuth, async (req, res) => {
    try {
      const { categories, searchTerm } = req.body;
      const { scrapeUsanaProducts, filterProductsByCategory, searchProducts } = await import("./usana-scraper");
      
      console.log('제품 필터링 요청:', { categories, searchTerm });
      
      let products = await scrapeUsanaProducts();
      
      // 카테고리 필터링
      if (categories && categories.length > 0) {
        products = filterProductsByCategory(products, categories);
      }
      
      // 검색어 필터링
      if (searchTerm) {
        products = searchProducts(products, searchTerm);
      }
      
      res.json({
        success: true,
        data: products,
        total: products.length
      });
    } catch (error) {
      console.error('제품 필터링 오류:', error);
      res.status(500).json({
        success: false,
        message: "제품 필터링 중 오류가 발생했습니다.",
        error: error instanceof Error ? error.message : "알 수 없는 오류"
      });
    }
  });

  // 사이트 설정 관리 API
  app.get("/api/site-settings", async (req, res) => {
    try {
      const settings = await storage.getSiteSettings();
      res.json(settings);
    } catch (error) {
      console.error('사이트 설정 조회 오류:', error);
      res.status(500).json({
        success: false,
        message: "사이트 설정을 가져오는 중 오류가 발생했습니다."
      });
    }
  });

  app.get("/api/site-settings/:key", async (req, res) => {
    try {
      const { key } = req.params;
      const setting = await storage.getSiteSetting(key);
      if (setting) {
        res.json(setting);
      } else {
        res.status(404).json({
          success: false,
          message: "설정을 찾을 수 없습니다."
        });
      }
    } catch (error) {
      console.error('사이트 설정 조회 오류:', error);
      res.status(500).json({
        success: false,
        message: "사이트 설정을 가져오는 중 오류가 발생했습니다."
      });
    }
  });

  app.put("/api/site-settings/:key", requireAdminAuth, async (req, res) => {
    try {
      const { key } = req.params;
      const { value } = req.body;
      
      if (!value) {
        return res.status(400).json({
          success: false,
          message: "값을 입력해주세요."
        });
      }

      const updatedSetting = await storage.updateSiteSetting(key, value);
      res.json({
        success: true,
        data: updatedSetting
      });
    } catch (error) {
      console.error('사이트 설정 업데이트 오류:', error);
      res.status(500).json({
        success: false,
        message: "사이트 설정 업데이트 중 오류가 발생했습니다."
      });
    }
  });

  // 전체 사이트 설정 일괄 업데이트 API
  app.post("/api/site-settings/bulk-update", requireAdminAuth, async (req, res) => {
    try {
      const { settings } = req.body;
      
      if (!settings || !Array.isArray(settings)) {
        return res.status(400).json({
          success: false,
          message: "올바른 설정 데이터를 제공해주세요."
        });
      }

      let successCount = 0;
      const results = [];

      for (const setting of settings) {
        try {
          if (setting.key && setting.value !== undefined) {
            const updatedSetting = await storage.updateSiteSetting(setting.key, setting.value);
            results.push({ key: setting.key, success: true, data: updatedSetting });
            successCount++;
          }
        } catch (error) {
          console.error(`설정 ${setting.key} 업데이트 실패:`, error);
          results.push({ key: setting.key, success: false, error: error instanceof Error ? error.message : 'Unknown error' });
        }
      }

      res.json({
        success: true,
        message: `${successCount}개의 설정이 성공적으로 업데이트되었습니다.`,
        updatedCount: successCount,
        totalCount: settings.length,
        results: results
      });
    } catch (error) {
      console.error('일괄 사이트 설정 업데이트 오류:', error);
      res.status(500).json({
        success: false,
        message: "일괄 사이트 설정 업데이트 중 오류가 발생했습니다."
      });
    }
  });

  // 히어로 이미지 업로드 API
  app.post("/api/admin/upload-hero-image", requireAdminAuth, upload.single('heroImage'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "이미지 파일을 선택해주세요."
        });
      }

      const { imageType } = req.body; // 'desktop' 또는 'mobile'
      
      if (!imageType || !['desktop', 'mobile'].includes(imageType)) {
        return res.status(400).json({
          success: false,
          message: "올바른 이미지 타입을 지정해주세요. (desktop 또는 mobile)"
        });
      }

      // 업로드된 파일의 URL 생성
      const fileUrl = `/uploads/${req.file.filename}`;
      const fullUrl = `${req.protocol}://${req.get('host')}${fileUrl}`;
      
      // 사이트 설정에 저장
      const settingKey = imageType === 'desktop' ? 'hero_desktop_image' : 'hero_mobile_image';
      const updatedSetting = await storage.updateSiteSetting(settingKey, fullUrl);

      res.json({
        success: true,
        message: `${imageType === 'desktop' ? '데스크톱' : '모바일'} 히어로 이미지가 성공적으로 업로드되었습니다.`,
        imageUrl: fullUrl,
        setting: updatedSetting
      });
    } catch (error) {
      console.error('히어로 이미지 업로드 오류:', error);
      res.status(500).json({
        success: false,
        message: "이미지 업로드 중 오류가 발생했습니다."
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
