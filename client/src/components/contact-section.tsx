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
import { Phone, Mail, MessageCircle, Send, Clock } from "lucide-react";
import { insertContactSchema, type InsertContact } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { openKakaoChat, callPhone } from "@/lib/utils";

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
      const response = await apiRequest("POST", "/api/contacts", data);
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
    setIsSubmitting(true);
    contactMutation.mutate(data);
  };

  const contactInfo = {
    phone: "010-4259-5311",
    email: "okaypark7@gmail.com",
    kakao: "holicotu"
  };

  const operatingHours = [
    { day: "평일 (월-금)", time: "24시까지 언제든지" },
    { day: "토요일", time: "24시까지 언제든지" },
    { day: "일요일/공휴일", time: "24시까지 언제든지" }
  ];

  return (
    <section id="contact" className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">상담 신청</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            건강한 라이프스타일과 수익 창출의 기회, 지금 바로 시작해보세요. 
            전문 상담을 통해 맞춤형 솔루션을 제안해드립니다.
          </p>
        </div>

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
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                      <button type="button" className="text-usana-blue-600 hover:underline ml-1">
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
                <h3 className="text-2xl font-bold text-gray-900 mb-6">연락처 정보</h3>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-usana-blue-500 p-3 rounded-full">
                      <Phone className="text-white h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-gray-600">전화 상담</p>
                      <p className="text-xl font-semibold text-gray-900">{contactInfo.phone}</p>
                      <p className="text-sm text-gray-500">24시까지 언제든지</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="bg-green-500 p-3 rounded-full">
                      <MessageCircle className="text-white h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-gray-600">카카오톡 상담</p>
                      <p className="text-xl font-semibold text-gray-900">{contactInfo.kakao}</p>
                      <p className="text-sm text-gray-500">24시간 언제든지</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="bg-red-500 p-3 rounded-full">
                      <Mail className="text-white h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-gray-600">이메일 상담</p>
                      <p className="text-xl font-semibold text-gray-900">{contactInfo.email}</p>
                      <p className="text-sm text-gray-500">24시간 내 답변</p>
                    </div>
                  </div>
                </div>
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
