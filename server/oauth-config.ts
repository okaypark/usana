import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as KakaoStrategy } from "passport-kakao";
import { storage } from "./storage";

// 구글 OAuth 설정
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails?.[0]?.value;
      const googleId = profile.id;
      
      // 주 관리자 이메일 확인
      if (email === 'okaypark7@gmail.com') {
        const adminUser = {
          id: googleId,
          email,
          name: profile.displayName,
          provider: 'google',
          role: 'super_admin',
          profileImage: profile.photos?.[0]?.value
        };
        return done(null, adminUser);
      }
      
      return done(null, false, { message: '관리자 권한이 없습니다.' });
    } catch (error) {
      return done(error);
    }
  }));
}

// 카카오 OAuth 설정
if (process.env.KAKAO_CLIENT_ID) {
  passport.use(new KakaoStrategy({
    clientID: process.env.KAKAO_CLIENT_ID,
    callbackURL: "/api/auth/kakao/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const kakaoId = profile.id;
      const email = profile._json?.kakao_account?.email;
      
      // 승인된 카카오 사용자인지 확인
      const isApproved = await storage.isApprovedKakaoUser(kakaoId);
      if (!isApproved) {
        return done(null, false, { message: '승인되지 않은 사용자입니다.' });
      }
      
      const kakaoUser = {
        id: kakaoId,
        email,
        name: profile.displayName,
        provider: 'kakao',
        role: 'admin',
        profileImage: profile._json?.properties?.profile_image
      };
      
      return done(null, kakaoUser);
    } catch (error) {
      return done(error);
    }
  }));
}

passport.serializeUser((user: any, done) => {
  done(null, user);
});

passport.deserializeUser((user: any, done) => {
  done(null, user);
});

export default passport;