import { useState } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Phone, Mail, MessageCircle, Send, Clock, Users } from "lucide-react";
import { insertContactSchema, type InsertContact } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { openKakaoChat, callPhone } from "@/lib/utils";
import kakaoTalkIcon from "@assets/카카오톡문의_1753107407844.png";
import openChatIcon from "@assets/오픈채팅문의_1753107603498.png";
import PrivacyPolicyPopup from "./privacy-policy-popup";

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  // 사이트 설정 불러오기
  const { data: siteSettings = [] } = useQuery({
    queryKey: ['/api/site-settings'],
    queryFn: async () => {
      const response = await fetch('/api/site-settings');
      if (!response.ok) {
        throw new Error('Failed to fetch site settings');
      }
      return response.json();
    },
  });
  
  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      interest: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      const response = await apiRequest("/api/contacts", "POST", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "상담 신청 완료",
        description: "상담 신청이 접수되었습니다. 빠른 시일 내에 연락드리겠습니다!",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/contacts"] });
    },
    onError: (error) => {
      toast({
        title: "신청 실패",
        description: "상담 신청 중 오류가 발생했습니다. 다시 시도해주세요.",
        variant: "destructive",
      });
      console.error("Contact submission error:", error);
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const onSubmit = (data: InsertContact) => {
    console.log('폼 제출 데이터:', data);
    
    // 추가 검증: 필수 필드 확인
    const requiredFields = [
      { field: data.name, name: "이름" },
      { field: data.phone, name: "전화번호" },
      { field: data.interest, name: "관심 분야" }
    ];

    const missingFields = requiredFields.filter(item => !item.field || item.field.trim() === '');
    
    if (missingFields.length > 0) {
      const missingFieldNames = missingFields.map(item => item.name).join(', ');
      console.log('누락된 필드:', missingFields);
      toast({
        title: "입력 확인",
        description: `다음 항목을 입력해주세요: ${missingFieldNames}`,
        variant: "destructive",
      });
      return;
    }

    // 전화번호 형식 검증
    const phoneRegex = /^[0-9-]{10,}$/;
    if (!phoneRegex.test(data.phone)) {
      toast({
        title: "전화번호 형식 오류",
        description: "올바른 전화번호 형식으로 입력해주세요 (예: 010-1234-5678)",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // 이메일 검증 (입력된 경우에만)
    if (data.email && data.email.trim() !== '') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        toast({
          title: "이메일 형식 오류",
          description: "올바른 이메일 형식으로 입력해주세요",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }
    }

    setIsSubmitting(true);
    contactMutation.mutate(data);
  };

  // 동적 연락처 정보 가져오기
  const getContactInfo = () => ({
    phone: siteSettings.find((s: any) => s.key === 'admin_phone')?.value || "010-4259-5311",
    email: siteSettings.find((s: any) => s.key === 'admin_email')?.value || "okaypark7@gmail.com",
    kakao: siteSettings.find((s: any) => s.key === 'admin_kakao')?.value || "holicotu",
    openChat: "유사나 건강구독 오픈채팅"
  });
  
  const contactInfo = getContactInfo();

  const operatingHours = [
    { day: "평일 (월-금)", time: "🕐 밤 12시까지 언제든지" },
    { day: "토요일", time: "🕐 밤 12시까지 언제든지" },
    { day: "일요일/공휴일", time: "🕐 밤 12시까지 언제든지" }
  ];

  return (
    <section id="contact" className="py-16 sm:py-24 lg:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-white shadow-lg">
            <CardContent className="p-8 lg:p-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">무료 상담 신청하기</h3>
              
              {/* 직접 연락 버튼들 */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                <Button
                  onClick={() => window.open(`tel:${contactInfo.phone}`)}
                  className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                  size="sm"
                >
                  <Phone className="w-4 h-4" />
                  전화상담
                </Button>
                <Button
                  onClick={() => window.open(`https://open.kakao.com/me/${contactInfo.kakao}`)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white flex items-center gap-2"
                  size="sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  카톡문의
                </Button>
              </div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>이름 *</FormLabel>
                        <FormControl>
                          <Input placeholder="홍길동" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>연락처 *</FormLabel>
                        <FormControl>
                          <Input placeholder="010-1234-5678" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>이메일</FormLabel>
                        <FormControl>
                          <Input placeholder="example@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="interest"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>관심 분야 *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="선택해주세요" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="products">제품 구매 및 건강 상담</SelectItem>
                            <SelectItem value="subscription">건강 구독 서비스</SelectItem>
                            <SelectItem value="business">사업 기회 상담</SelectItem>
                            <SelectItem value="brochure">이메일로 사업안내 자료 받아보기</SelectItem>
                            <SelectItem value="both">제품 + 사업 모두</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>문의 내용</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="궁금한 점이나 상담받고 싶은 내용을 자유롭게 적어주세요."
                            className="resize-none"
                            rows={4}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex items-start space-x-2">
                    <Checkbox id="privacy" required />
                    <label htmlFor="privacy" className="text-sm text-gray-600 leading-relaxed">
                      개인정보 수집 및 이용에 동의합니다. 
                      <button 
                        type="button" 
                        className="text-blue-600 hover:underline ml-1"
                        onClick={() => setShowPrivacyPolicy(true)}
                      >
                        자세히 보기
                      </button>
                    </label>
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full gradient-usana-cta text-white py-4 text-lg font-semibold h-auto hover:opacity-90"
                  >
                    <Send className="mr-2 h-5 w-5" />
                    {isSubmitting ? "신청 중..." : "상담 신청하기"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Methods */}
            <Card className="bg-white shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-6">연락처 정보</h3>
                <div className="space-y-6">
                  <div 
                    className="flex items-center space-x-4 cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors"
                    onClick={() => callPhone(contactInfo.phone)}
                  >
                    <div className="bg-usana-blue-500 p-3 rounded-full">
                      <Phone className="text-white h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-gray-600">전화 상담</p>
                      <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">{contactInfo.phone}</p>
                      <p className="text-sm text-gray-500">🕐 밤 12시까지 언제든지</p>
                    </div>
                  </div>
                  
                  <div 
                    className="flex items-center space-x-4 cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors"
                    onClick={openKakaoChat}
                  >
                    <div className="bg-yellow-400 p-2 rounded-full flex items-center justify-center">
                      <img 
                        src={kakaoTalkIcon} 
                        alt="KakaoTalk" 
                        className="h-8 w-8 object-contain"
                      />
                    </div>
                    <div>
                      <p className="text-gray-600">카카오톡 상담</p>
                      <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">{contactInfo.kakao}</p>
                      <p className="text-sm text-gray-500">🕐 밤 12시까지 언제든지</p>
                    </div>
                  </div>
                  
                  <div 
                    className="flex items-center space-x-4 cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors" 
                    onClick={() => window.open('https://open.kakao.com/o/sJeNT3fg', '_blank')}
                  >
                    <div className="bg-yellow-400 p-2 rounded-full flex items-center justify-center">
                      <img 
                        src={openChatIcon} 
                        alt="Open Chat" 
                        className="h-8 w-8 object-contain"
                      />
                    </div>
                    <div>
                      <p className="text-gray-600">오픈채팅 문의</p>
                      <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">{contactInfo.openChat}</p>
                      <p className="text-sm text-gray-500">🕐 밤 12시까지 언제든지</p>
                    </div>
                  </div>
                  
                  <div 
                    className="flex items-center space-x-4 cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors"
                    onClick={() => window.location.href = `mailto:${contactInfo.email}`}
                  >
                    <div className="bg-usana-blue-500 p-3 rounded-full">
                      <Mail className="text-white h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-gray-600">이메일 상담</p>
                      <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">{contactInfo.email}</p>
                      <p className="text-sm text-gray-500">🕐 밤 12시까지 언제든지</p>
                    </div>
                  </div>

                </div>
              </CardContent>
            </Card>



            {/* Consultation Area */}
            <Card className="bg-white shadow-lg">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  상담 가능 지역
                </h4>
                <p className="text-gray-700 text-lg">전국 무료상담 가능</p>
              </CardContent>
            </Card>

            {/* Operating Hours */}
            <Card className="bg-white shadow-lg">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Clock className="mr-2 h-5 w-5" />
                  상담 가능 시간
                </h4>
                <div className="space-y-2 text-gray-700">
                  {operatingHours.map((hour, index) => (
                    <div key={index} className="flex justify-between">
                      <span>{hour.day}</span>
                      <span>{hour.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* 개인정보 처리방침 팝업 */}
      <PrivacyPolicyPopup
        isOpen={showPrivacyPolicy}
        onClose={() => setShowPrivacyPolicy(false)}
        showAgreeButton={false}
      />
    </section>
  );
}
