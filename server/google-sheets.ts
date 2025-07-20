import type { InsertContact } from '@shared/schema';

// Google Apps Script 웹앱 URL
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxwUuCHWz2Nmo5iv762WBTSRdb2qRi-QJ0Cac_2PttY14ottX3GZhaTsagvUUQRUDp1/exec';

interface GoogleSheetsService {
  addContactToSheet: (contact: InsertContact) => Promise<void>;
}

class GoogleSheetsServiceImpl implements GoogleSheetsService {
  async addContactToSheet(contact: InsertContact): Promise<void> {
    try {
      console.log('🔄 Google Sheets 연동 시도 중...');
      console.log('📊 전송할 데이터:', contact);
      
      if (APPS_SCRIPT_URL.includes('YOUR_SCRIPT_ID')) {
        throw new Error('Google Apps Script 웹앱 URL이 아직 설정되지 않았습니다. GOOGLE_SHEETS_SETUP.md를 참고하여 설정해주세요.');
      }
      
      // Google Sheets에 데이터 추가를 위한 웹앱 호출
      const response = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'addContact',
          data: {
            timestamp: new Date().toLocaleString('ko-KR'),
            name: contact.name,
            phone: contact.phone,
            email: contact.email,
            interest: contact.interest,
            message: contact.message,
          }
        }),
        redirect: 'follow'
      });

      if (!response.ok) {
        throw new Error(`Google Sheets API Error: ${response.statusText}`);
      }

      const result = await response.json();
      
      if (result.status !== 'success') {
        throw new Error(`Google Sheets Error: ${result.message}`);
      }

      console.log('상담신청 데이터가 Google Sheets에 성공적으로 추가되었습니다.');
      
    } catch (error) {
      console.error('Google Sheets 연동 오류:', error);
      throw error;
    }
  }
}

export const googleSheetsService = new GoogleSheetsServiceImpl();