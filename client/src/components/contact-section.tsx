import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Phone, Mail, MessageCircle, Send, Clock, Users } from "lucide-react";
import { insertContactSchema, type InsertContact } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { openKakaoChat, callPhone } from "@/lib/utils";
import kakaoTalkIcon from "@assets/카카오톡문의_1753107407844.png";
import openChatIcon from "@assets/오픈채팅문의_1753107603498.png";

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
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

  const contactInfo = {
    phone: "010-4259-5311",
    email: "okaypark7@gmail.com",
    kakao: "holicotu",
    openChat: "유사나 건강구독 오픈채팅"
  };

  const operatingHours = [
    { day: "평일 (월-금)", time: "24시까지 언제든지" },
    { day: "토요일", time: "24시까지 언제든지" },
    { day: "일요일/공휴일", time: "24시까지 언제든지" }
  ];

  return (
    <section id="contact" className="py-16 sm:py-24 lg:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-white shadow-lg">
            <CardContent className="p-8 lg:p-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">무료 상담 신청하기</h3>
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
                      <Dialog>
                        <DialogTrigger asChild>
                          <button type="button" className="text-usana-blue-600 hover:underline ml-1">
                            자세히 보기
                          </button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>개인정보 수집 및 이용 동의서</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 text-sm text-gray-700">
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">1. 개인정보 수집 항목</h4>
                              <p>- 필수항목: 성명, 휴대폰번호, 이메일주소, 상담내용</p>
                              <p>- 선택항목: 관심분야</p>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">2. 개인정보 수집 및 이용목적</h4>
                              <p>- 건강구독 및 제품 상담 서비스 제공</p>
                              <p>- 사업기회 안내 및 멘토링 서비스 제공</p>
                              <p>- 고객 문의사항 답변 및 상담</p>
                              <p>- 맞춤형 건강 솔루션 제공</p>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">3. 개인정보 보유 및 이용기간</h4>
                              <p>- 상담 완료 후 3년간 보관</p>
                              <p>- 관련 법령에 따라 보존해야 하는 경우 해당 기간까지 보관</p>
                              <p>- 정보주체가 삭제를 요청하는 경우 즉시 삭제</p>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">4. 개인정보 제3자 제공</h4>
                              <p>- 원칙적으로 개인정보를 외부에 제공하지 않습니다</p>
                              <p>- 법령에 의해 요구되는 경우에만 제공됩니다</p>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">5. 개인정보 처리 위탁</h4>
                              <p>- 상담 서비스 향상을 위해 일부 업무를 위탁할 수 있습니다</p>
                              <p>- 위탁업체와 위탁업무는 별도 고지합니다</p>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">6. 정보주체의 권리</h4>
                              <p>- 개인정보 열람, 정정·삭제, 처리정지 요구권</p>
                              <p>- 동의 철회권</p>
                              <p>- 권리행사는 서면, 전화, 이메일 등으로 가능합니다</p>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">7. 동의 거부권 및 불이익</h4>
                              <p>- 개인정보 수집·이용 동의를 거부할 권리가 있습니다</p>
                              <p>- 다만, 필수항목 동의 거부 시 상담 서비스 이용이 제한될 수 있습니다</p>
                            </div>
                            
                            <div className="border-t pt-4">
                              <h4 className="font-semibold text-gray-900 mb-2">개인정보 보호책임자</h4>
                              <p>- 성명: 박현진</p>
                              <p>- 연락처: 010-4259-5311</p>
                              <p>- 이메일: okaypark7@gmail.com</p>
                            </div>
                            
                            <div className="bg-usana-blue-50 p-4 rounded-lg">
                              <p className="text-xs text-gray-600">
                                본 동의서는 2025년 1월 20일부터 시행됩니다. 
                                개인정보보호법 등 관련 법령이나 지침의 변경, 내부 정책의 변경 등으로 
                                본 방침의 내용이 변경될 수 있으며, 변경 시에는 홈페이지를 통해 공지하겠습니다.
                              </p>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
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
                      <p className="text-sm text-gray-500">24시까지 언제든지</p>
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
                      <p className="text-sm text-gray-500">24시간 언제든지</p>
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
                      <p className="text-sm text-gray-500">24시간 언제든지</p>
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
    </section>
  );
}
