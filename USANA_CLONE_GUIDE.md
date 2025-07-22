# USANA 프로젝트 완전 복제 가이드

## 현재 프로젝트 구조 백업
이 가이드는 현재 USANA 건강구독마케팅 프로젝트를 완전히 복제하는 방법을 제공합니다.

## 1단계: 새 Replit 프로젝트 생성 방법

### 방법 1: 직접 URL 접근
브라우저에서 새 탭 열고:
```
https://replit.com/new/nodejs
```

### 방법 2: Replit 대시보드
1. replit.com 접속
2. 로그인 후 좌상단 "Replit" 로고 클릭
3. "Create" 또는 "+" 버튼 찾아서 클릭
4. Node.js 템플릿 선택
5. 프로젝트명: "usana1" 입력

## 2단계: 필수 파일 복사 목록

### 루트 디렉토리 파일들
- `package.json`
- `package-lock.json`
- `tsconfig.json`
- `vite.config.ts`
- `tailwind.config.ts`
- `postcss.config.js`
- `drizzle.config.ts`
- `components.json`
- `generate-admin-hash.js`
- `google-apps-script.js`
- `replit.md`

### 폴더 전체 복사
1. **client/** - 전체 React 프론트엔드
2. **server/** - 전체 Express 백엔드
3. **shared/** - 공유 스키마
4. **attached_assets/** - 모든 이미지 파일들

## 3단계: 새 프로젝트에서 실행할 명령어
```bash
# 패키지 설치
npm install

# PostgreSQL 데이터베이스 스키마 생성
npm run db:push

# 관리자 계정 생성
node generate-admin-hash.js

# 개발 서버 실행
npm run dev
```

## 4단계: 데이터베이스 복제
새 프로젝트에서 다음 SQL을 실행하세요 (Replit Shell에서 `npm run db:push` 실행 후):

### 데이터베이스 구조 및 데이터 복원
현재 프로젝트의 `database_clone_script.sql` 파일을 새 프로젝트로 복사한 후:
```bash
# PostgreSQL 접속하여 데이터 복원
psql $DATABASE_URL -f database_clone_script.sql
```

## 5단계: 환경 확인사항
- DATABASE_URL이 자동으로 설정되는지 확인
- PostgreSQL이 정상 작동하는지 확인
- 모든 패키지가 설치되었는지 확인

## 완료 후 결과
- 원본: 현재 프로젝트 유지
- 복제본: usana1 프로젝트로 독립 운영
- 각각 다른 .replit.app 도메인

이 방법으로 현재 USANA 프로젝트와 100% 동일한 기능의 독립적인 웹사이트를 운영할 수 있습니다.