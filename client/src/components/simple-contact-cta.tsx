import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Send } from "lucide-react";
import { insertContactSchema, type InsertContact } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function SimpleContactCTA() {
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
    console.log('폼 제출 데이터:', data);
    
    // 필수 필드 확인
    const requiredFields = [
      { field: data.name, name: "이름" },
      { field: data.phone, name: "전화번호" },
      { field: data.interest, name: "관심 분야" }
    ];

    const missingFields = requiredFields.filter(item => !item.field || item.field.trim() === '');
    
    if (missingFields.length > 0) {
      const missingFieldNames = missingFields.map(item => item.name).join(', ');
      toast({
        title: "필수 항목 확인",
        description: `${missingFieldNames}을(를) 입력해주세요.`,
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(true);
    contactMutation.mutate(data);
  };

  return (
    <section className="bg-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              size="lg"
              className="gradient-usana-cta text-white px-12 py-6 text-xl font-semibold rounded-full hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Send className="mr-3 h-6 w-6" />
              무료 상담 신청하기
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-900">무료 상담 신청</DialogTitle>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
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
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}