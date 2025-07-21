# USANA Premium Business Website

## Project Overview
USANA 네트워크 마케팅 웹사이트는 건강 제품 판매와 비즈니스 기회를 제공하는 종합 디지털 플랫폼입니다. 고급스럽고 세련된 비즈니스 스타일로 전문성과 신뢰성을 강조하는 디자인으로 구현되었습니다.

## User Preferences
- **Design Style**: 고급지고 세련된 비즈니스 스타일 선호
- **Contact Information**: 박현진 (USANA 에메랄드 디렉터), 010-4259-5311, okaypark7@gmail.com
- **Business Focus**: 월 200-300만원 수익 창출, 주급 시스템, 영업압박 없는 자연스러운 진행
- **Operating Hours**: 밤 12시까지 언제든지, 휴일없음

## Technical Architecture
- **Frontend**: React.js with TypeScript
- **Backend**: Express.js with in-memory storage
- **Styling**: TailwindCSS with premium business color scheme
- **UI Components**: shadcn/ui component library
- **Icons**: Lucide React icons
- **Typography**: Pretendard + Noto Sans KR for premium Korean typography
- **Responsive**: Mobile-first design approach
- **Data Management**: Google Sheets API + Apps Script integration
- **Notifications**: Gmail API for real-time email alerts

## Recent Changes (Latest Updates)
- **2025-01-21**: 패키지 완전 초기화 및 레이아웃 재구성
  - **패키지 초기화**: 모든 패키지 제품 삭제 및 포인트 0P로 초기화 완료
  - **설명 텍스트 제거**: 각 패키지의 하드코딩된 설명 텍스트 모두 제거
  - **순수 DB 연동**: 관리자 페이지에서 등록한 제품만 표시되는 순수한 DB 기반 시스템 구현
  - **레이아웃 재배치**: "건강구독 테마별 패키지" 섹션을 Premium Product Portfolio 아래로 이동
  - **동적 가격 시스템**: 실제 제품 데이터 기반 동적 계산 (빈 패키지는 0P 표시)
  - **간단한 삭제 알림**: 제품 삭제 시 confirm 팝업 제거하고 "제거되었습니다" 1초 토스트 알림으로 변경
- **2025-01-21**: USANA 제품 관리 시스템 완성 및 버그 수정
  - **제품 스크래핑 시스템**: 156개 USANA 제품 자동 스크래핑 (뉴트리션 37개, 셀라비브 22개, 바디&헤어 6개, 유사나기프트팩 90개, 프로모션 1개)
  - **제품 선택기**: 카테고리별 필터링 및 검색 기능을 갖춘 제품 선택 인터페이스
  - **중복 제품 추가 방지**: 제품 추가 시 중복 실행 방지 로직 구현
  - **실시간 UI 업데이트**: 제품 추가 후 즉시 패키지 목록에 반영
  - **관리자 제품 관리**: 패키지별 제품 추가/수정/삭제 완전 기능
- **2025-01-21**: 완전한 역할 기반 관리자 시스템 구현 완료
  - **주 관리자 시스템**: okaypark7@gmail.com을 주 관리자로 설정, 왕관 아이콘과 황금색 배경으로 구분
  - **관리자 권한 관리**: 주 관리자만 다른 관리자 추가/삭제 가능, 자기 자신은 삭제 불가 보호
  - **관리자 추가 기능**: 이메일, 이름, 비밀번호로 새 관리자 등록, 중복 이메일 검증
  - **관리자 목록 표시**: 실시간 관리자 목록 조회, 이름/이메일/가입일 표시
  - **다중 관리자 로그인**: 모든 등록된 관리자 로그인 가능, 개별 세션 관리
  - **비밀번호 변경**: 로그인 후 현재/새 비밀번호로 안전한 변경 가능
  - **세션 기반 인증**: 쿠키 세션으로 인증 상태 유지, bcrypt 암호화
  - **UI/UX 완성**: 관리자별 권한 표시, 삭제 버튼, 확인 다이얼로그
- **2025-01-20**: Major UI/UX and messaging updates
  - **Typography Enhancement**: Upgraded from Inter to premium Korean fonts (Pretendard + Noto Sans KR)
  - **Brand Identity**: Changed "USANA BUSINESS" → "유사나 건강구독 마케팅" with official USANA logo
  - **Messaging Strategy**: Refined main headline to subscription marketing concept:
    - "프리미엄 영양제로 건강구독"
    - "2명에게 건강구독마케팅 소개하면"  
    - "당신도 매주 주급받는 스마트한 돈버는 소비자"
  - **Responsive Design**: Enhanced hero section layout (3:2 grid ratio, wider content area)
  - **Mobile Optimization**: Fixed Premium Success box positioning to avoid content overlap
  - **Google Sheets Integration**: Implemented comprehensive contact management system
    - Automatic data storage in Google Sheets (SPREADSHEET_ID: 1TSNJpgQqjKUY9XZDDhKKFO15l-1KZFNsU-_HImo4-NI)
    - Real-time email notifications to okaypark7@gmail.com
    - Google Apps Script automation for seamless processing
    - **RESOLVED**: Apps Script gid=0 reference issue by new webapp deployment
    - **Final Apps Script URL**: https://script.google.com/macros/s/AKfycbxnI80h4_BndzBrTwx9XNcepzH-I6lRduAa4RQJDl2_VF-gCevSUbzoOtVhg0AyOVc9/exec
  - **User Preference**: All future work to be fully responsive (PC + Mobile dynamic sizing)

## Key Features
1. **Premium Business Branding**: Navy and gold color scheme for executive appeal
2. **Sophisticated Typography**: Inter font with advanced OpenType features
3. **Executive Visual Elements**: Premium gradients, shadows, and blur effects
4. **Professional Process Flow**: 4-step premium partnership process visualization
5. **Revenue Structure Display**: Transparent income potential presentation
6. **Authentic Product Integration**: Natural placement of USANA products in lifestyle scenes

## Design System
### Color Palette
- **Primary Navy**: Deep professional navy tones (900-600)
- **Accent Gold**: Premium gold highlights (600-400)
- **Neutral Platinum**: Sophisticated light tones (100-300)
- **Supporting Charcoal**: Rich dark alternatives (900-800)

### Typography Scale
- **Headlines**: Inter font, weights 700-900, tight tracking
- **Body Text**: Inter font, weights 400-500, relaxed leading
- **Accent Text**: Gold color, medium-semibold weights

### Layout Principles
- Generous whitespace for executive feel
- Elevated cards with premium shadows
- Backdrop blur effects for sophistication
- Subtle borders and gradients for depth

## Business Messaging
- Focus on "Executive", "Premium", "Professional" terminology
- Emphasis on passive income and business opportunities
- Clear revenue structure transparency
- No-pressure, consumption-based approach
- Global network and partnership focus