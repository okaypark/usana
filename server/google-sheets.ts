import { google } from 'googleapis';
import type { InsertContact } from '@shared/schema';

// Google Sheets 설정
const SPREADSHEET_ID = '1BvTxoF5-9RcxW8_Hj3KpL2mN4qR7sU8vY9zA'; // 실제 스프레드시트 ID로 변경 필요
const SHEET_NAME = '상담신청';

// Google Apps Script 웹앱 URL (나중에 설정)
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';

interface GoogleSheetsService {
  addContactToSheet: (contact: InsertContact) => Promise<void>;
}

class GoogleSheetsServiceImpl implements GoogleSheetsService {
  async addContactToSheet(contact: InsertContact): Promise<void> {
    try {
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
        })
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