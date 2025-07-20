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

        {/* Enhanced Contact Section */}
        <div className="mt-16 space-y-6">
          {/* Main Contact Card */}
          <Card className="gradient-usana-cta text-white overflow-hidden">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h3 className="text-3xl font-bold mb-4">🌟 개인맞춤 건강구독 상담</h3>
                <p className="text-lg mb-2">유사나 브랜드 파트너 박현진</p>
                <p className="text-base opacity-90">개인맞춤영양 상담 | 무료건강구독 상담 | 부업·사업 멘토링</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="text-center space-y-4">
                  <div className="bg-white/20 rounded-xl p-6 backdrop-blur-sm">
                    {/* KakaoTalk Character Illustration */}
                    <div className="mb-4 flex justify-center">
                      <svg width="100" height="100" viewBox="0 0 100 100" className="drop-shadow-lg">
                        {/* Phone */}
                        <rect x="30" y="20" width="40" height="60" rx="10" fill="#2D3748" stroke="#4A5568" strokeWidth="2"/>
                        <rect x="33" y="25" width="34" height="45" rx="3" fill="#68D391"/>
                        <circle cx="50" cy="75" r="4" fill="#4A5568"/>
                        
                        {/* Person holding phone */}
                        <circle cx="50" cy="10" r="8" fill="#F7FAFC" stroke="#2D3748" strokeWidth="2"/>
                        <ellipse cx="46" cy="7" rx="1.5" ry="2" fill="#2D3748"/>
                        <ellipse cx="54" cy="7" rx="1.5" ry="2" fill="#2D3748"/>
                        <path d="M 46 12 Q 50 15 54 12" stroke="#2D3748" strokeWidth="2" fill="none"/>
                        
                        {/* Hands */}
                        <ellipse cx="22" cy="45" rx="5" ry="8" fill="#F7FAFC" stroke="#2D3748" strokeWidth="1.5"/>
                        <ellipse cx="78" cy="45" rx="5" ry="8" fill="#F7FAFC" stroke="#2D3748" strokeWidth="1.5"/>
                        
                        {/* Chat bubbles on screen */}
                        <ellipse cx="40" cy="35" rx="5" ry="3" fill="#FECA57"/>
                        <ellipse cx="60" cy="42" rx="5" ry="3" fill="#FFFFFF"/>
                        <ellipse cx="42" cy="52" rx="4" ry="2.5" fill="#FECA57"/>
                      </svg>
                    </div>
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
                
                <div className="text-center space-y-4">
                  <div className="bg-white/20 rounded-xl p-6 backdrop-blur-sm">
                    {/* Phone Call Character Illustration */}
                    <div className="mb-4 flex justify-center">
                      <svg width="100" height="100" viewBox="0 0 100 100" className="drop-shadow-lg">
                        {/* Person's head */}
                        <circle cx="50" cy="30" r="16" fill="#F7FAFC" stroke="#2D3748" strokeWidth="2"/>
                        <ellipse cx="44" cy="26" rx="2" ry="2.5" fill="#2D3748"/>
                        <ellipse cx="56" cy="26" rx="2" ry="2.5" fill="#2D3748"/>
                        <path d="M 44 35 Q 50 40 56 35" stroke="#2D3748" strokeWidth="2" fill="none"/>
                        
                        {/* Hair - more detailed */}
                        <path d="M 34 20 Q 50 12 66 20 Q 62 16 50 14 Q 38 16 34 20" fill="#2D3748"/>
                        
                        {/* Neck */}
                        <rect x="47" y="46" width="6" height="8" fill="#F7FAFC" stroke="#2D3748" strokeWidth="1"/>
                        
                        {/* Phone handset - more realistic */}
                        <rect x="25" y="20" width="25" height="8" rx="4" fill="#4A5568"/>
                        <rect x="27" y="22" width="5" height="4" rx="2" fill="#68D391"/>
                        <rect x="42" y="22" width="5" height="4" rx="2" fill="#68D391"/>
                        <circle cx="35" cy="24" r="1" fill="#10B981"/>
                        
                        {/* Arm and shoulder - more human-like */}
                        <ellipse cx="35" cy="55" rx="8" ry="15" fill="#F7FAFC" stroke="#2D3748" strokeWidth="1.5" transform="rotate(-25 35 55)"/>
                        <circle cx="42" cy="48" r="4" fill="#F7FAFC" stroke="#2D3748" strokeWidth="1"/>
                        
                        {/* Body/shoulder */}
                        <ellipse cx="50" cy="70" rx="20" ry="25" fill="#EDF2F7" stroke="#2D3748" strokeWidth="1.5"/>
                        
                        {/* Sound waves */}
                        <path d="M 18 24 Q 15 24 18 24" stroke="#10B981" strokeWidth="2" fill="none" opacity="0.8"/>
                        <path d="M 15 24 Q 10 24 15 24" stroke="#10B981" strokeWidth="2" fill="none" opacity="0.6"/>
                        <path d="M 12 24 Q 5 24 12 24" stroke="#10B981" strokeWidth="2" fill="none" opacity="0.4"/>
                      </svg>
                    </div>
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
                <div className="text-3xl mb-3">🎯</div>
                <h4 className="font-semibold text-gray-900 mb-2">무료 건강 체크</h4>
                <p className="text-sm text-gray-700">개인맞춤 영양 상담으로 당신만의 건강 솔루션 제공</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-3">💰</div>
                <h4 className="font-semibold text-gray-900 mb-2">수익 구조 안내</h4>
                <p className="text-sm text-gray-700">2명 소개로 시작하는 월 100-300만원 수익 창출 방법</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 sm:col-span-2 lg:col-span-1">
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-3">✈️</div>
                <h4 className="font-semibold text-gray-900 mb-2">여행 혜택 안내</h4>
                <p className="text-sm text-gray-700">제주부터 유럽까지, 다양한 여행 혜택과 인센티브</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Email Contact */}
          <Card className="bg-gray-50 border-gray-200">
            <CardContent className="p-6 text-center">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">📧 이메일 문의</h4>
              <p className="text-gray-700">okaypark7@gmail.com</p>
              <p className="text-sm text-gray-500 mt-2">자세한 자료와 안내서를 이메일로 받아보세요</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
