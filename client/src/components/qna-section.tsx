import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, MessageCircle, Phone, List } from "lucide-react";
import { openKakaoChat, callPhone } from "@/lib/utils";
import talkIcon from "@assets/스크린샷 2025-07-20 175222_1753001694463.png";
import type { Faq } from "@shared/schema";

export default function QnaSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showQuestionList, setShowQuestionList] = useState(false);

  const { data: faqs = [], isLoading } = useQuery<Faq[]>({
    queryKey: ["/api/faqs"],
  });

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const toggleQuestionList = () => {
    setShowQuestionList(!showQuestionList);
  };

  if (isLoading) {
    return (
      <section id="qna" className="py-16 sm:py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">자주 묻는 질문</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">
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
    <section id="qna" className="py-16 sm:py-24 lg:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">자주 묻는 질문</h2>
          <p className="text-xl text-gray-600">
            USANA와 건강 구독, 사업 기회에 대해 궁금한 점들을 확인해보세요.
          </p>
          
          {/* Question List Toggle */}
          <div className="mt-6">
            <Button
              onClick={toggleQuestionList}
              variant="outline"
              className="flex items-center gap-2 mx-auto hover:bg-blue-50"
            >
              <List className="h-4 w-4" />
              질문 전체목록
              <Badge variant="secondary" className="ml-1">{faqs.length}</Badge>
              <span className="text-sm ml-1">
                {showQuestionList ? '접기' : '보기'}
              </span>
              <ChevronDown 
                className={`h-4 w-4 transition-transform duration-200 ${
                  showQuestionList ? 'rotate-180' : ''
                }`}
              />
            </Button>
            

          </div>
        </div>

        {/* FAQ Cards - Only show when toggle is active */}
        {showQuestionList && (
          <div className="space-y-6">
            {faqs.map((faq, index) => (
            <Card 
              key={faq.id} 
              id={`faq-${index}`}
              className="bg-white border border-gray-200 hover:border-gray-300 transition-all duration-200 overflow-hidden shadow-sm hover:shadow-md"
            >
              <button
                className="w-full text-left p-6 focus:outline-none hover:bg-gray-50 transition-all duration-200 cursor-pointer"
                onClick={() => toggleFaq(index)}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-start gap-3">
                    <Badge variant="outline" className="flex-shrink-0 mt-1">
                      Q{index + 1}
                    </Badge>
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500 font-medium">
                      {openFaq === index ? '접기' : '답변보기'}
                    </span>
                    <ChevronDown 
                      className={`text-gray-500 h-5 w-5 transition-transform duration-200 flex-shrink-0 ${
                        openFaq === index ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </div>
              </button>
              {openFaq === index && (
                <CardContent className="px-6 pb-6 pt-0 border-t border-gray-100">
                  <div className="pt-4">
                    <div className="flex items-start gap-3">
                      <Badge variant="secondary" className="flex-shrink-0 mt-1">
                        A
                      </Badge>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">{faq.answer}</p>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
