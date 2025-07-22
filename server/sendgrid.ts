import sgMail from '@sendgrid/mail';

interface EmailParams {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendEmail(params: EmailParams): Promise<boolean> {
  try {
    if (!process.env.SENDGRID_API_KEY) {
      console.log('⚠️ SENDGRID_API_KEY가 설정되지 않았습니다. 이메일 전송을 건너뜁니다.');
      return false;
    }

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: params.to,
      from: params.from,
      subject: params.subject,
      ...(params.text && { text: params.text }),
      ...(params.html && { html: params.html }),
    };

    console.log('📧 SendGrid를 통해 이메일 전송 중...', {
      to: params.to,
      subject: params.subject
    });

    await sgMail.send(msg);
    console.log('✅ 이메일이 성공적으로 전송되었습니다.');
    return true;
  } catch (error) {
    console.error('❌ SendGrid 이메일 전송 실패:', error);
    return false;
  }
}

export function createConsultationEmailHtml(contactData: any): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #1e3a8a, #3b82f6); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
        .info-row { margin: 15px 0; padding: 10px; background: white; border-radius: 6px; border-left: 4px solid #3b82f6; }
        .label { font-weight: bold; color: #1e3a8a; margin-bottom: 5px; }
        .value { color: #374151; }
        .footer { background: #374151; color: white; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🏥 유사나 건강구독 상담 신청</h1>
          <p>새로운 상담 신청이 접수되었습니다</p>
        </div>
        
        <div class="content">
          <div class="info-row">
            <div class="label">📅 신청 시간</div>
            <div class="value">${new Date().toLocaleString('ko-KR')}</div>
          </div>
          
          <div class="info-row">
            <div class="label">👤 이름</div>
            <div class="value">${contactData.name || '미입력'}</div>
          </div>
          
          <div class="info-row">
            <div class="label">📞 연락처</div>
            <div class="value">${contactData.phone || '미입력'}</div>
          </div>
          
          <div class="info-row">
            <div class="label">📧 이메일</div>
            <div class="value">${contactData.email || '미입력'}</div>
          </div>
          
          <div class="info-row">
            <div class="label">🎯 관심분야</div>
            <div class="value">${contactData.interest || '미입력'}</div>
          </div>
          
          <div class="info-row">
            <div class="label">💬 상담 내용</div>
            <div class="value">${contactData.message || '미입력'}</div>
          </div>
          
          ${contactData.source ? `
          <div class="info-row">
            <div class="label">📍 신청 경로</div>
            <div class="value">${contactData.source}</div>
          </div>
          ` : ''}
        </div>
        
        <div class="footer">
          <p>💼 유사나 건강구독마케팅 시스템</p>
          <p>이 이메일은 자동으로 생성되었습니다.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}