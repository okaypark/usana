# USANA1 프로젝트 완전 설정 가이드

## 1. GitHub에서 프로젝트 클론

### Replit에서 새 프로젝트 생성
```
GitHub Repository URL: https://github.com/okaypark/usana
```

## 2. 프로젝트 초기 설정

### 터미널에서 실행 (순서대로)
```bash
# 의존성 설치
npm install

# 데이터베이스 스키마 생성
npm run db:push

# 백업된 데이터 복원 (모든 테이블)
psql $DATABASE_URL -f usana1_database_migration.sql

# 서버 실행
npm run dev
```

## 3. 데이터베이스 복원 내용

### 복원되는 테이블 (8개)
- **packages** (6개) - 면역건강, 해독다이어트, 피부건강 패키지
- **package_products** (28개) - 모든 제품 조합
- **faqs** (12개) - 완전한 FAQ 데이터
- **admins** (2개) - 관리자 계정 (okaypark7@gmail.com, holictou00@gmail.com)
- **contacts** (3개) - 고객 문의 데이터
- **users** (0개) - 빈 테이블
- **usana_products** (0개) - 빈 테이블  
- **approved_admins** (0개) - 빈 테이블

## 4. 관리자 로그인

### 기존 계정으로 즉시 로그인 가능
- **주 관리자**: okaypark7@gmail.com
- **부 관리자**: holictou00@gmail.com
- 비밀번호: 기존과 동일 (해시된 상태로 이전)

## 5. 확인 방법

### 웹사이트 접속 후 확인
1. 홈페이지 - 6개 패키지 표시 확인
2. FAQ 섹션 - 12개 질문 답변 확인
3. /admin 접속 - 관리자 로그인 테스트
4. 관리자 페이지 - 패키지 및 제품 관리 확인

## 6. 문제 해결

### 데이터베이스 오류 시
```bash
# 스키마 강제 재생성
npm run db:push --force

# 데이터 재복원
psql $DATABASE_URL -f usana1_database_migration.sql
```

### 관리자 로그인 문제 시
```bash
# 새 관리자 계정 생성 (필요시)
node generate-admin-hash.js
```

## 완료!
usana1 프로젝트가 원본과 100% 동일하게 독립 운영됩니다.