/**
 * Google Apps Script 코드
 * 이 코드를 Google Apps Script 프로젝트에 복사해서 사용하세요.
 * 
 * 설정 방법:
 * 1. script.google.com에서 새 프로젝트 생성
 * 2. 이 코드를 붙여넣기
 * 3. doPost 함수를 웹앱으로 배포
 * 4. 웹앱 URL을 server/google-sheets.ts의 APPS_SCRIPT_URL에 입력
 */

// 스프레드시트 ID (실제 스프레드시트 ID로 변경)
const SPREADSHEET_ID = '1BvTxoF5-9RcxW8_Hj3KpL2mN4qR7sU8vY9zA';
const SHEET_NAME = '상담신청';
const NOTIFICATION_EMAIL = 'okaypark7@gmail.com';

/**
 * 웹앱 POST 요청 처리
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    if (data.action === 'addContact') {
      addContactToSheet(data.data);
      sendNotificationEmail(data.data);
      
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
    console.error('Error:', error);
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * 스프레드시트에 상담신청 데이터 추가
 */
function addContactToSheet(contactData) {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  
  // 시트가 없으면 생성
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    
    // 헤더 추가
    const headers = ['접수일시', '이름', '전화번호', '이메일', '관심분야', '문의내용'];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    
    // 헤더 스타일링
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground('#4285F4');
    headerRange.setFontColor('white');
    headerRange.setFontWeight('bold');
  }
  
  // 데이터 추가
  const rowData = [
    contactData.timestamp,
    contactData.name,
    contactData.phone,
    contactData.email,
    getInterestText(contactData.interest),
    contactData.message
  ];
  
  sheet.appendRow(rowData);
  
  // 자동 크기 조정
  sheet.autoResizeColumns(1, 6);
}

/**
 * 관심분야 코드를 한글로 변환
 */
function getInterestText(interest) {
  const interestMap = {
    'products': '제품 구매 및 건강 상담',
    'subscription': '건강 구독 서비스',
    'business': '사업 기회 상담',
    'brochure': '이메일로 사업안내 자료 받아보기',
    'both': '제품 + 사업 모두'
  };
  
  return interestMap[interest] || interest;
}

/**
 * 이메일 알림 발송
 */
function sendNotificationEmail(contactData) {
  const subject = '🔔 새로운 상담신청이 접수되었습니다';
  
  const emailBody = `
새로운 상담신청이 접수되었습니다.

📅 접수일시: ${contactData.timestamp}
👤 이름: ${contactData.name}
📞 전화번호: ${contactData.phone}
📧 이메일: ${contactData.email}
🎯 관심분야: ${getInterestText(contactData.interest)}
💬 문의내용: 
${contactData.message}

---
USANA 건강구독 마케팅 상담신청 시스템
  `;
  
  // Gmail로 알림 발송
  GmailApp.sendEmail(
    NOTIFICATION_EMAIL,
    subject,
    emailBody
  );
  
  console.log('이메일 알림이 발송되었습니다:', NOTIFICATION_EMAIL);
}

/**
 * 테스트 함수 (수동 실행용)
 */
function testNotification() {
  const testData = {
    timestamp: new Date().toLocaleString('ko-KR'),
    name: '테스트 고객',
    phone: '010-1234-5678',
    email: 'test@example.com',
    interest: 'business',
    message: '테스트 문의입니다.'
  };
  
  addContactToSheet(testData);
  sendNotificationEmail(testData);
}