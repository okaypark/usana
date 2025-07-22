# USANA1 데이터베이스 마이그레이션 가이드

## 개요
현재 USANA 프로젝트의 모든 데이터베이스 내용을 새로운 usana1 프로젝트로 완전히 이전하는 방법입니다.

## 마이그레이션 데이터 내용

### 📦 패키지 데이터 (6개)
- **면역건강**: 스탠다드(115P), 프리미엄(210P)
- **해독다이어트**: 스탠다드(149P), 프리미엄(215P)  
- **피부건강**: 스탠다드(127P), 프리미엄(230P)

### 🧬 패키지 제품 (28개 제품 조합)
- 헬스팩, 바이오메가, 프로바이오틱 등 핵심 영양제
- 셀라비브 스킨케어 제품군
- 정확한 가격, 포인트, 수량 정보 포함

### ❓ FAQ 데이터 (12개)
- 제품 안전성, 구독 시스템, 사업 방식
- 수익 구조, 상담 방법 등 완전한 FAQ

## 실행 방법

### 1단계: usana1 프로젝트 준비
```bash
# usana1 프로젝트에서 데이터베이스 스키마 생성
npm run db:push
```

### 2단계: 마이그레이션 스크립트 실행
```bash
# PostgreSQL 접속하여 데이터 복원
psql $DATABASE_URL -f usana1_database_migration.sql
```

### 3단계: 결과 확인
```bash
# 웹사이트 접속하여 확인
npm run dev
```

## 마이그레이션 후 결과

### ✅ 완전히 동일한 기능
- 모든 패키지와 제품 정보 동일
- FAQ 섹션 완전 복제
- 관리자 기능 동일 (새 관리자 생성 필요)

### ✅ 독립적인 운영
- 별도 .replit.app 도메인
- 독립적인 데이터베이스
- 원본 프로젝트와 완전 분리

### ✅ 데이터 검증
- 패키지 6개 정상 이전
- 제품 조합 28개 정상 이전
- FAQ 12개 정상 이전

## 주의사항

1. **관리자 계정**: 새 프로젝트에서 `node generate-admin-hash.js` 실행 필요
2. **환경 변수**: DATABASE_URL 자동 설정 확인
3. **이미지 파일**: attached_assets 폴더 별도 복사 필요

## 문제 해결

### 스키마 오류 시
```bash
npm run db:push --force
```

### 데이터 중복 오류 시
```sql
TRUNCATE TABLE package_products CASCADE;
TRUNCATE TABLE packages CASCADE;
TRUNCATE TABLE faqs CASCADE;
```

이 방법으로 현재 USANA 프로젝트와 100% 동일한 기능의 usana1 웹사이트를 독립적으로 운영할 수 있습니다.