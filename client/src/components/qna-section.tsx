import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, MessageCircle, Phone } from "lucide-react";
import { openKakaoChat, callPhone } from "@/lib/utils";
import type { Faq } from "@shared/schema";

export default function QnaSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const { data: faqs = [], isLoading } = useQuery<Faq[]>({
    queryKey: ["/api/faqs"],
  });

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  if (isLoading) {
    return (
      <section id="qna" className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">자주 묻는 질문</h2>
            <p className="text-xl text-gray-600">
              USANA와 건강 구독, 사업 기회에 대해 궁금한 점들을 확인해보세요.
            </p>
          </div>
          <div className="space-y-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-slate-50 rounded-xl p-6 animate-pulse">
                <div className="h-6 bg-gray-300 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="qna" className="bg-white py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">자주 묻는 질문</h2>
          <p className="text-xl text-gray-600">
            USANA와 건강 구독, 사업 기회에 대해 궁금한 점들을 확인해보세요.
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <Card key={faq.id} className="bg-slate-50 overflow-hidden">
              <button
                className="w-full text-left p-6 focus:outline-none hover:bg-slate-100 transition-colors"
                onClick={() => toggleFaq(index)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                  <ChevronDown 
                    className={`text-gray-500 h-5 w-5 transition-transform flex-shrink-0 ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </button>
              {openFaq === index && (
                <CardContent className="px-6 pb-6 pt-0">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* Contact for More Questions */}
        <Card className="mt-16 gradient-usana-cta text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">더 궁금한 점이 있으신가요?</h3>
            <p className="text-lg mb-6">언제든지 편하게 문의해주세요. 자세하고 친절한 상담을 제공해드립니다.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={openKakaoChat}
                className="bg-white text-usana-blue-600 hover:bg-gray-100 font-semibold"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                카카오톡 상담
              </Button>
              <Button
                onClick={() => callPhone("010-1234-5678")}
                className="bg-white text-usana-blue-600 hover:bg-gray-100 font-semibold"
              >
                <Phone className="mr-2 h-4 w-4" />
                전화 상담
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
