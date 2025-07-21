import { Request, Response, NextFunction } from 'express';

// OAuth 인증된 관리자 확인 미들웨어
export const requireOAuthAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ 
      success: false, 
      message: "인증이 필요합니다." 
    });
  }

  const user = req.user as any;
  
  // 주 관리자 (Google OAuth) 또는 승인된 관리자 (Kakao OAuth) 확인
  if (user.role === 'super_admin' || user.role === 'admin') {
    return next();
  }

  return res.status(403).json({ 
    success: false, 
    message: "관리자 권한이 필요합니다." 
  });
};

// 주 관리자 전용 미들웨어
export const requireSuperAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ 
      success: false, 
      message: "인증이 필요합니다." 
    });
  }

  const user = req.user as any;
  
  if (user.role !== 'super_admin') {
    return res.status(403).json({ 
      success: false, 
      message: "주 관리자 권한이 필요합니다." 
    });
  }

  return next();
};