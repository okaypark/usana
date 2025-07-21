import bcrypt from 'bcryptjs';

// 관리자 비밀번호 해시 생성 스크립트
async function generateAdminHash() {
  const password = process.argv[2];
  
  if (!password) {
    console.log('사용법: node generate-admin-hash.js [비밀번호]');
    console.log('예시: node generate-admin-hash.js mySecretPassword123');
    process.exit(1);
  }
  
  try {
    const saltRounds = 12;
    const hash = await bcrypt.hash(password, saltRounds);
    
    console.log('\n=== 관리자 계정 설정 ===');
    console.log('다음 환경변수를 설정하세요:');
    console.log('\nADMIN_USERNAME=admin');
    console.log(`ADMIN_PASSWORD_HASH=${hash}`);
    console.log('\n환경변수 설정 방법:');
    console.log('1. Replit Secrets에서 위 두 변수를 추가하거나');
    console.log('2. .env 파일에 추가하세요 (개발환경용)');
    console.log('\n보안을 위해 이 스크립트 실행 후 삭제하는 것을 권장합니다.');
    
  } catch (error) {
    console.error('해시 생성 중 오류:', error);
    process.exit(1);
  }
}

generateAdminHash();