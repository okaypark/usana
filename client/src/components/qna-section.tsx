import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, MessageCircle, Phone } from "lucide-react";
import { openKakaoChat, callPhone } from "@/lib/utils";
import talkIcon from "@assets/스크린샷 2025-07-20 175222_1753001694463.png";
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

        {/* Enhanced Contact Section */}
        <div className="mt-16 space-y-6">
          {/* Main Contact Card */}
          <Card className="gradient-usana-cta text-white overflow-hidden">
            <CardContent className="p-8">
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold mb-3">개인맞춤 건강구독 상담</h3>
                <p className="text-lg mb-2">유사나 브랜드 파트너 박현진</p>
                <p className="text-sm opacity-90">개인맞춤영양 상담 | 무료건강구독 상담 | 부업·사업 멘토링</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="text-center">
                  <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
                    <h4 className="text-xl font-semibold mb-3">즉시 상담 가능</h4>
                    <p className="text-sm mb-4 opacity-90">카톡ID: holicotu</p>
                    <Button
                      onClick={openKakaoChat}
                      className="bg-yellow-400 text-black hover:bg-yellow-500 font-semibold px-6 py-3 rounded-full transition-all transform hover:scale-105"
                    >
                      <MessageCircle className="mr-2 h-5 w-5" />
                      카카오톡 상담하기
                    </Button>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
                    <h4 className="text-xl font-semibold mb-3">직통 전화 상담</h4>
                    <p className="text-sm mb-4 opacity-90">밤 12시까지, 휴일없음</p>
                    <Button
                      onClick={() => callPhone("010-4259-5311")}
                      className="bg-green-500 text-white hover:bg-green-600 font-semibold px-6 py-3 rounded-full transition-all transform hover:scale-105"
                    >
                      <Phone className="mr-2 h-5 w-5" />
                      010-4259-5311
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Benefits Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-6 text-center">
                <div className="text-5xl mb-3">🎯</div>
                <h4 className="font-semibold text-gray-900 mb-2">무료 건강 체크</h4>
                <p className="text-sm text-gray-700">개인맞춤 영양 상담으로 당신만의 건강 솔루션 제공</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="p-6 text-center">
                <div className="text-5xl mb-3">💰</div>
                <h4 className="font-semibold text-gray-900 mb-2">수익 구조 안내</h4>
                <p className="text-sm text-gray-700">2명 소개로 시작하는 월 100-300만원 수익 창출 방법</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 sm:col-span-2 lg:col-span-1">
              <CardContent className="p-6 text-center">
                <div className="text-5xl mb-3">✈️</div>
                <h4 className="font-semibold text-gray-900 mb-2">여행 혜택 안내</h4>
                <p className="text-sm text-gray-700">제주부터 유럽까지, 다양한 여행 혜택과 인센티브</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Email Contact */}
          <Card className="bg-gray-50 border-gray-200">
            <CardContent className="p-6 text-center">
              <div className="mb-4">
                <div className="text-5xl mb-3">📧</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">이메일 상담</h4>
                <p className="text-gray-700 mb-4">okaypark7@gmail.com</p>
                <Button
                  onClick={() => {
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="bg-blue-500 text-white hover:bg-blue-600 font-semibold px-6 py-3 rounded-full transition-all transform hover:scale-105"
                >
                  무료상담 신청하기
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
