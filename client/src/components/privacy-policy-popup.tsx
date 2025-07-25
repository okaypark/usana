import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { useQuery } from "@tanstack/react-query";

interface SiteSetting {
  id: number;
  key: string;
  value: string;
}

interface PrivacyPolicyPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onAgree?: () => void;
  showAgreeButton?: boolean;
}

export default function PrivacyPolicyPopup({ 
  isOpen, 
  onClose, 
  onAgree,
  showAgreeButton = false
}: PrivacyPolicyPopupProps) {
  // 사이트 설정 조회
  const { data: siteSettings = [] } = useQuery<SiteSetting[]>({
    queryKey: ['/api/site-settings'],
  });

  const adminPhone = siteSettings.find((s: any) => s.key === 'admin_phone')?.value || '010-4259-5311';

  const handleAgree = () => {
    if (onAgree) {
      onAgree();
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh]" aria-describedby="privacy-policy-description">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">개인정보 수집 및 이용 동의서</DialogTitle>
          <DialogDescription id="privacy-policy-description" className="text-gray-600">
            개인정보 보호법에 따라 개인정보 수집 및 이용에 대한 동의를 받고 있습니다.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[70vh] pr-4">
          <div className="space-y-6 text-sm text-gray-700">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 text-base">1. 개인정보 수집 항목</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="mb-2"><strong>필수항목:</strong> 성명, 휴대폰번호, 상담내용</p>
                <p><strong>선택항목:</strong> 이메일주소, 상담유형</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 text-base">2. 개인정보 수집 및 이용목적</h4>
              <div className="bg-blue-50 p-4 rounded-lg">
                <ul className="space-y-1">
                  <li>• 건강구독 및 제품 상담 서비스 제공</li>
                  <li>• 사업기회 안내 및 멘토링 서비스 제공</li>
                  <li>• 고객 문의사항 답변 및 상담</li>
                  <li>• 맞춤형 건강 솔루션 제공</li>
                  <li>• 서비스 개선을 위한 통계 분석</li>
                </ul>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 text-base">3. 개인정보 보유 및 이용기간</h4>
              <div className="bg-green-50 p-4 rounded-lg">
                <ul className="space-y-1">
                  <li>• 상담 완료 후 3년간 보관</li>
                  <li>• 관련 법령에 따라 보존해야 하는 경우 해당 기간까지 보관</li>
                  <li>• 정보주체가 삭제를 요청하는 경우 즉시 삭제</li>
                  <li>• 회원 탈퇴 시 즉시 삭제 (단, 법령에 의한 보관 의무가 있는 경우 제외)</li>
                </ul>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 text-base">4. 개인정보 제3자 제공</h4>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <ul className="space-y-1">
                  <li>• 원칙적으로 개인정보를 외부에 제공하지 않습니다</li>
                  <li>• 법령에 의해 요구되는 경우에만 제공됩니다</li>
                  <li>• 사전 동의를 받은 경우에만 제3자에게 제공</li>
                </ul>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 text-base">5. 개인정보 처리 위탁</h4>
              <div className="bg-purple-50 p-4 rounded-lg">
                <ul className="space-y-1">
                  <li>• 상담 서비스 향상을 위해 일부 업무를 위탁할 수 있습니다</li>
                  <li>• 위탁업체: Google (데이터 저장), 네이버 (메일 발송)</li>
                  <li>• 위탁업무 내용: 데이터 보관, 이메일 발송</li>
                  <li>• 위탁계약 시 개인정보 보호 조항을 포함하여 관리</li>
                </ul>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 text-base">6. 정보주체의 권리</h4>
              <div className="bg-indigo-50 p-4 rounded-lg">
                <ul className="space-y-1">
                  <li>• 개인정보 열람, 정정·삭제, 처리정지 요구권</li>
                  <li>• 동의 철회권</li>
                  <li>• 권리행사는 서면, 전화, 이메일 등으로 가능합니다</li>
                  <li>• 만 14세 미만은 법정대리인의 동의가 필요합니다</li>
                </ul>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 text-base">7. 동의 거부권 및 불이익</h4>
              <div className="bg-red-50 p-4 rounded-lg">
                <ul className="space-y-1">
                  <li>• 개인정보 수집·이용 동의를 거부할 권리가 있습니다</li>
                  <li>• 다만, 필수항목 동의 거부 시 상담 서비스 이용이 제한될 수 있습니다</li>
                  <li>• 선택항목 동의 거부 시에도 기본 상담 서비스는 이용 가능합니다</li>
                </ul>
              </div>
            </div>
            
            <div className="border-t-2 pt-6">
              <h4 className="font-semibold text-gray-900 mb-3 text-base">개인정보 보호책임자</h4>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p><strong>성명:</strong> {siteSettings.find((s: any) => s.key === 'admin_name')?.value || '박현진'}</p>
                <p><strong>연락처:</strong> {adminPhone}</p>
                <p><strong>이메일:</strong> {siteSettings.find((s: any) => s.key === 'admin_email')?.value || 'okaypark7@gmail.com'}</p>
                <p><strong>담당부서:</strong> 개인정보보호팀</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-100 to-teal-100 p-6 rounded-lg border-l-4 border-blue-500">
              <h5 className="font-semibold text-gray-900 mb-2">개인정보 안전성 확보조치</h5>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• 개인정보 취급자 교육 실시</li>
                <li>• 개인정보 처리시스템 접근권한 관리</li>
                <li>• 접근통제시스템 설치 및 운영</li>
                <li>• 개인정보의 암호화</li>
                <li>• 보안프로그램 설치 및 갱신</li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-4 rounded-lg text-center">
              <p className="text-xs text-gray-600">
                본 동의서는 2025년 1월 22일부터 시행됩니다.<br/>
                개인정보보호법 등 관련 법령이나 지침의 변경, 내부 정책의 변경 등으로 
                본 방침의 내용이 변경될 수 있으며, 변경 시에는 홈페이지를 통해 공지하겠습니다.
              </p>
            </div>
          </div>
        </ScrollArea>
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="px-6"
          >
            닫기
          </Button>
          {showAgreeButton && (
            <Button 
              onClick={handleAgree}
              className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-6"
            >
              동의하고 닫기
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}