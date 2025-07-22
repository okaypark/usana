import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Phone, MessageCircle, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface SiteSetting {
  id: number;
  key: string;
  value: string;
}

interface ConsultationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
}

export default function ConsultationPopup({ 
  isOpen, 
  onClose, 
  title = "건강구독 상담 신청", 
  description = "건강한 생활과 수익 창출을 위한 맞춤 상담을 신청하세요."
}: ConsultationPopupProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // 사이트 설정 조회
  const { data: siteSettings = [] } = useQuery<SiteSetting[]>({
    queryKey: ['/api/site-settings'],
  });

  const adminPhone = siteSettings.find(s => s.key === 'admin_phone')?.value || '010-4259-5311';
  const adminKakao = siteSettings.find(s => s.key === 'admin_kakao')?.value || '';
  const openchatUrl = siteSettings.find(s => s.key === 'openchat_url')?.value || '';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const contactData = {
        name: formData.get('name') as string,
        phone: formData.get('phone') as string,
        email: formData.get('email') as string,
        message: `[${formData.get('consultationType') || '일반상담'}] ${formData.get('message') as string}`,
        source: title // 어떤 팝업에서 왔는지 구분
      };

      const response = await apiRequest('/api/contacts', 'POST', contactData);
      
      if (response.ok) {
        toast({
          title: "상담 신청 완료",
          description: "상담 신청이 성공적으로 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.",
        });
        (e.target as HTMLFormElement).reset();
        onClose();
      }
    } catch (error) {
      toast({
        title: "신청 실패",
        description: "상담 신청 중 오류가 발생했습니다. 다시 시도해주세요.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDirectContact = (method: 'phone' | 'kakao' | 'openchat') => {
    switch (method) {
      case 'phone':
        window.open(`tel:${adminPhone}`);
        break;
      case 'kakao':
        if (adminKakao) {
          window.open(`https://open.kakao.com/me/${adminKakao}`);
        }
        break;
      case 'openchat':
        if (openchatUrl) {
          window.open(openchatUrl, '_blank');
        }
        break;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold text-navy-800">{title}</DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-6 w-6 p-0 hover:bg-gray-100"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription className="text-gray-600">
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* 직접 연락 버튼들 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Button
              onClick={() => handleDirectContact('phone')}
              className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
              size="sm"
            >
              <Phone className="w-4 h-4" />
              전화상담
            </Button>
            {adminKakao && (
              <Button
                onClick={() => handleDirectContact('kakao')}
                className="bg-yellow-500 hover:bg-yellow-600 text-white flex items-center gap-2"
                size="sm"
              >
                <MessageCircle className="w-4 h-4" />
                카카오톡
              </Button>
            )}
            {openchatUrl && (
              <Button
                onClick={() => handleDirectContact('openchat')}
                className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                size="sm"
              >
                <MessageCircle className="w-4 h-4" />
                오픈채팅
              </Button>
            )}
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold text-gray-800 mb-4">상담 신청서 작성</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">이름 *</Label>
                  <Input
                    id="name"
                    name="name"
                    required
                    placeholder="홍길동"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">연락처 *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    required
                    placeholder="010-0000-0000"
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="example@email.com"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="consultationType">상담 유형</Label>
                <Select name="consultationType">
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="상담 유형을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">일반 건강상담</SelectItem>
                    <SelectItem value="package">건강구독 패키지 상담</SelectItem>
                    <SelectItem value="business">비즈니스 파트너십 상담</SelectItem>
                    <SelectItem value="product">제품 문의</SelectItem>
                    <SelectItem value="nutrition">영양 상담</SelectItem>
                    <SelectItem value="skincare">스킨케어 상담</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="message">상담 내용</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="상담을 원하시는 내용을 자세히 적어주세요."
                  rows={4}
                  className="mt-1"
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-navy-700 hover:bg-navy-800 text-white font-semibold py-3"
              >
                {isSubmitting ? '신청 중...' : '상담 신청하기'}
              </Button>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}