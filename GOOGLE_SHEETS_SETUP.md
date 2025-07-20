# Google Sheets 상담신청 시스템 설정 가이드

## 📋 개요
웹사이트 상담신청을 Google Sheets에 자동으로 저장하고, okaypark7@gmail.com으로 즉시 알림을 받는 시스템입니다.

## 1. Google Spreadsheet 생성

1. [Google Sheets](https://sheets.google.com)에서 새 스프레드시트 생성
2. 스프레드시트 이름을 "USANA 상담신청"으로 변경
3. URL에서 스프레드시트 ID 복사
   - 예: `https://docs.google.com/spreadsheets/d/1BvTxoF5-9RcxW8_Hj3KpL2mN4qR7sU8vY9zA/edit`
   - ID: `1BvTxoF5-9RcxW8_Hj3KpL2mN4qR7sU8vY9zA`

## 2. Google Apps Script 설정

1. [Google Apps Script](https://script.google.com)에서 새 프로젝트 생성
2. 프로젝트 이름을 "USANA 상담신청 처리기"로 변경
3. `google-apps-script.js` 파일의 내용을 Code.gs에 붙여넣기
4. 다음 값들을 수정:
   ```javascript
   const SPREADSHEET_ID = '실제_스프레드시트_ID';
   const NOTIFICATION_EMAIL = 'okaypark7@gmail.com';
   ```

## 3. 웹앱 배포

1. Apps Script에서 "배포" → "새 배포" 클릭
2. 유형을 "웹앱"으로 선택
3. 다음 설정:
   - 실행 계정: 나
   - 액세스 권한: 모든 사용자
4. "배포" 클릭 후 웹앱 URL 복사

## 4. 서버 설정 업데이트

1. `server/google-sheets.ts` 파일에서 다음 값들 수정:
   ```typescript
   const SPREADSHEET_ID = '실제_스프레드시트_ID';
   const APPS_SCRIPT_URL = '실제_웹앱_URL';
   ```

## 5. 권한 승인

1. Apps Script에서 "testNotification" 함수 실행
2. Gmail 및 Sheets 접근 권한 승인
3. 테스트 이메일 및 시트 데이터 확인

## 6. 실제 적용

서버 코드에서 Google Sheets 서비스 호출:

```typescript
import { googleSheetsService } from './google-sheets';

// 상담신청 처리 시
await googleSheetsService.addContactToSheet(contactData);
```

## 기능

- ✅ 상담신청 자동으로 Google Sheets에 저장
- ✅ 즉시 Gmail로 알림 발송
- ✅ 스마트폰 Gmail 앱 푸시 알림
- ✅ 데이터 영구 보관
- ✅ 엑셀로 내보내기 가능
- ✅ 완전 무료

## 알림 예시

```
🔔 새로운 상담신청이 접수되었습니다

📅 접수일시: 2025-01-20 10:30:15
👤 이름: 홍길동
📞 전화번호: 010-1234-5678
📧 이메일: hong@example.com
🎯 관심분야: 사업 기회 상담
💬 문의내용: 
사업 기회에 대해 자세히 알고 싶습니다.
```