# Google Sheets 상담신청 시스템 설정 가이드

## 📋 개요
웹사이트 상담신청을 Google Sheets에 자동으로 저장하고, okaypark7@gmail.com으로 즉시 알림을 받는 시스템입니다.

## 🚀 빠른 시작 가이드

### 1단계: Google Spreadsheet 생성

1. **[Google Sheets 열기](https://sheets.google.com)**
2. **"빈 스프레드시트" 클릭** (새 문서 만들기)
3. **제목을 "USANA 상담신청"으로 변경**
4. **URL에서 스프레드시트 ID 복사**
   ```
   https://docs.google.com/spreadsheets/d/[이부분이ID]/edit
   예: 1BvTxoF5-9RcxW8_Hj3KpL2mN4qR7sU8vY9zA
   ```

### 2단계: Google Apps Script 설정

1. **[Google Apps Script 열기](https://script.google.com)**
2. **"새 프로젝트" 클릭**
3. **프로젝트 이름을 "USANA 상담신청 처리기"로 변경**
4. **Code.gs 파일에 아래 코드 전체 붙여넣기:**

```javascript
// 1단계에서 복사한 스프레드시트 ID 입력
const SPREADSHEET_ID = '여기에_복사한_ID_입력';
const SHEET_NAME = '상담신청';
const NOTIFICATION_EMAIL = 'okaypark7@gmail.com';

function doPost(e) {
  try {
    console.log('doPost 요청 받음:', e.postData.contents);
    const data = JSON.parse(e.postData.contents);
    
    if (data.action === 'addContact') {
      console.log('addContact 실행 시작');
      addContactToSheet(data.data);
      console.log('스프레드시트 추가 완료');
      
      sendNotificationEmail(data.data);
      console.log('이메일 발송 완료');
      
      return ContentService
        .createTextOutput(JSON.stringify({
          status: 'success',
          message: '상담신청이 성공적으로 접수되었습니다.'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: '잘못된 요청입니다.'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('doPost 오류:', error);
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function addContactToSheet(contactData) {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    const headers = ['접수일시', '이름', '전화번호', '이메일', '관심분야', '문의내용'];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground('#4285F4');
    headerRange.setFontColor('white');
    headerRange.setFontWeight('bold');
  }
  
  const interestMap = {
    'products': '제품 구매 및 건강 상담',
    'subscription': '건강 구독 서비스',
    'business': '사업 기회 상담',
    'brochure': '이메일로 사업안내 자료 받아보기',
    'both': '제품 + 사업 모두'
  };
  
  const rowData = [
    contactData.timestamp,
    contactData.name,
    contactData.phone,
    contactData.email,
    interestMap[contactData.interest] || contactData.interest,
    contactData.message
  ];
  
  sheet.appendRow(rowData);
  sheet.autoResizeColumns(1, 6);
}

function sendNotificationEmail(contactData) {
  const subject = '🔔 새로운 상담신청이 접수되었습니다';
  
  const interestMap = {
    'products': '제품 구매 및 건강 상담',
    'subscription': '건강 구독 서비스',
    'business': '사업 기회 상담',
    'brochure': '이메일로 사업안내 자료 받아보기',
    'both': '제품 + 사업 모두'
  };
  
  const emailBody = `
새로운 상담신청이 접수되었습니다.

📅 접수일시: ${contactData.timestamp}
👤 이름: ${contactData.name}
📞 전화번호: ${contactData.phone}
📧 이메일: ${contactData.email}
🎯 관심분야: ${interestMap[contactData.interest] || contactData.interest}
💬 문의내용: 
${contactData.message}

---
USANA 건강구독 마케팅 상담신청 시스템
  `;
  
  GmailApp.sendEmail(NOTIFICATION_EMAIL, subject, emailBody);
  console.log('이메일 알림이 발송되었습니다:', NOTIFICATION_EMAIL);
}

function testNotification() {
  console.log('테스트 시작...');
  
  const testData = {
    timestamp: new Date().toLocaleString('ko-KR'),
    name: '테스트 고객',
    phone: '010-1234-5678',
    email: 'test@example.com',
    interest: 'business',
    message: '테스트 문의입니다.'
  };
  
  try {
    addContactToSheet(testData);
    console.log('스프레드시트 추가 완료');
    
    sendNotificationEmail(testData);
    console.log('이메일 발송 완료');
    
    return '테스트 성공!';
  } catch (error) {
    console.error('테스트 실패:', error);
    return '테스트 실패: ' + error.toString();
  }
}
```

5. **SPREADSHEET_ID 값을 1단계에서 복사한 ID로 변경**

### 3단계: 웹앱 배포

1. **Apps Script 우상단 "배포" 버튼 클릭**
2. **"새 배포" 선택**
3. **⚙️ 톱니바퀴 아이콘 클릭**하여 "웹앱" 선택
4. **다음 설정으로 변경:**
   - 실행 계정: **나**
   - 액세스 권한: **모든 사용자**
5. **"배포" 클릭**
6. **⚠️ 권한 승인 요청이 나오면 "액세스 승인" 클릭**
7. **웹앱 URL 복사 (매우 중요!)**
   ```
   https://script.google.com/macros/s/[긴문자열]/exec
   ```

### 4단계: 테스트 실행

1. **Apps Script에서 함수 선택 드롭다운에서 "testNotification" 선택**
2. **▶️ 실행 버튼 클릭**
3. **권한 승인 요청이 나오면:**
   - "권한 검토" 클릭
   - Google 계정 선택
   - "고급" 클릭 → "USANA 상담신청 처리기(안전하지 않음)로 이동" 클릭
   - "허용" 클릭
4. **실행 로그에서 성공 확인**
5. **Gmail에서 테스트 이메일 수신 확인**
6. **Google Sheets에서 테스트 데이터 확인**

### 5단계: 웹사이트 연결

**3단계에서 복사한 웹앱 URL을 알려주세요!**

예시: `https://script.google.com/macros/s/AKfycbx...길긴문자열.../exec`

이 URL을 코드에 입력하면 웹사이트와 연결이 완료됩니다.

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