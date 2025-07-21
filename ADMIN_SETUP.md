# 관리자 계정 설정 가이드

## 1. 관리자 비밀번호 해시 생성

안전한 관리자 비밀번호를 설정하기 위해 다음 단계를 따라주세요.

### 비밀번호 해시 생성하기

```bash
node generate-admin-hash.js [원하는비밀번호]
```

예시:
```bash
node generate-admin-hash.js mySecretPassword123
```

실행하면 다음과 같은 출력이 나타납니다:
```
=== 관리자 계정 설정 ===
다음 환경변수를 설정하세요:

ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=$2b$12$...해시값...

환경변수 설정 방법:
1. Replit Secrets에서 위 두 변수를 추가하거나
2. .env 파일에 추가하세요 (개발환경용)
```

## 2. 환경변수 설정

### Replit에서 설정 (권장)

1. Replit 프로젝트에서 **Secrets** 탭 클릭
2. 다음 변수들을 추가:
   - `ADMIN_USERNAME`: `admin` (또는 원하는 사용자명)
   - `ADMIN_PASSWORD_HASH`: 위에서 생성된 해시값
   - `SESSION_SECRET`: 랜덤한 긴 문자열 (세션 보안용)

### 로컬 개발환경 (.env 파일)

프로젝트 루트에 `.env` 파일 생성:

```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=$2b$12$...생성된해시값...
SESSION_SECRET=your-random-session-secret-key-here
```

## 3. 보안 주의사항

- ✅ 비밀번호는 최소 12자 이상, 대소문자/숫자/특수문자 포함
- ✅ 해시 생성 후 `generate-admin-hash.js` 파일 삭제 권장
- ✅ 실제 비밀번호는 절대 소스코드에 포함하지 마세요
- ✅ SESSION_SECRET은 충분히 복잡하고 랜덤한 값으로 설정

## 4. 관리자 로그인 사용법

1. 웹사이트 상단의 "관리자" 버튼 클릭
2. 설정한 사용자명과 비밀번호로 로그인
3. 패키지 관리 시스템에 접속하여 제품 편집

## 5. 문제해결

### 로그인이 안 될 때
- 환경변수가 올바르게 설정되었는지 확인
- 사용자명과 비밀번호가 정확한지 확인
- 서버 재시작 후 다시 시도

### 해시 생성 오류
```bash
npm install bcryptjs  # 패키지가 없다면 설치
node generate-admin-hash.js [비밀번호]
```