import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface BenefitItem {
  title: string;
  description: string | JSX.Element;
}

const benefits: BenefitItem[] = [
  {
    title: "🏆 다이아몬드 디렉터",
    description: (
      <>
        <strong className="text-violet-700">주급 최대 500만원</strong><br />
        <span className="text-violet-600">최고 등급 달성 시 받는 프리미엄 수당</span>
      </>
    )
  },
  {
    title: "💎 에메랄드 디렉터",
    description: (
      <>
        <strong className="text-green-700">주급 최대 200만원</strong><br />
        <span className="text-green-600">안정적인 고수익 창출 단계</span>
      </>
    )
  },
  {
    title: "🏅 골드 디렉터",
    description: (
      <>
        <strong className="text-yellow-700">주급 최대 100만원</strong><br />
        <span className="text-yellow-600">본격적인 수익 창출 시작 단계</span>
      </>
    )
  },
  {
    title: "🥉 실버 디렉터",
    description: (
      <>
        <strong className="text-gray-700">주급 최대 50만원</strong><br />
        <span className="text-gray-600">초기 성과 달성 단계</span>
      </>
    )
  },
  {
    title: "⭐ 스타터 단계",
    description: (
      <>
        <strong className="text-blue-700">주급 최대 20만원</strong><br />
        <span className="text-blue-600">누구나 쉽게 시작할 수 있는 첫 단계</span>
      </>
    )
  },
  {
    title: "🔄 지속성과 자동화",
    description: (
      <>
        한 번 구축된 네트워크를 통한 <span className="font-bold text-violet-700">자동화된 수익 창출 시스템</span>
      </>
    )
  }
];

export default function SubscriptionSection() {
  const [selectedBenefit, setSelectedBenefit] = useState<number | null>(null);

  return (
    <section id="subscription-benefits" className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-block px-8 py-4 bg-gradient-to-r from-violet-500/20 to-indigo-500/15 border-2 border-violet-500/30 rounded-full mb-8 shadow-xl shadow-violet-500/20">
            <span className="text-violet-700 text-lg font-bold tracking-wider">WEEKLY INCOME SYSTEM</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold text-slate-800 mb-8 tracking-tighter">
            <span className="text-violet-600">주급 시스템으로</span><br />
            <span className="text-indigo-600 font-semibold text-4xl lg:text-5xl">매주 받는 안정 수입</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light mb-12">
            월급이 아닌 <span className="text-violet-600 font-semibold">주급</span>으로 받는 새로운 수익 모델<br />
            <span className="text-indigo-600 font-semibold">영업 압박 없이</span> 자연스러운 소개로 시작하는<br />
            <span className="text-violet-600 font-bold">스마트한 부수익 창출 시스템</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-3xl font-bold text-slate-800 mb-8">등급별 주급 시스템</h3>
            <div className="space-y-4">
              {benefits.map((benefit, index) => {
                const isSelected = selectedBenefit === index;
                return (
                  <div
                    key={index}
                    className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                      isSelected
                        ? 'bg-gradient-to-r from-violet-50 to-indigo-50 border-violet-300 shadow-xl shadow-violet-200/50 scale-105'
                        : 'bg-white border-slate-200 hover:border-violet-200 hover:shadow-lg hover:scale-102'
                    }`}
                    onMouseEnter={() => setSelectedBenefit(index)}
                    onMouseLeave={() => setSelectedBenefit(null)}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-200 ${
                        isSelected ? 'bg-violet-500' : 'bg-slate-100'
                      }`}>
                        <Check className={`w-6 h-6 transition-colors duration-200 ${
                          isSelected ? 'text-white' : 'text-slate-400'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h4 className={`text-xl font-bold mb-2 transition-colors duration-200 ${
                          isSelected ? 'text-violet-700' : 'text-slate-800'
                        }`}>
                          {benefit.title}
                        </h4>
                        <p className={`leading-relaxed transition-colors duration-200 ${
                          isSelected ? 'text-indigo-700' : 'text-slate-600'
                        }`}>
                          {typeof benefit.description === 'string' ? (
                            benefit.description
                          ) : (
                            benefit.description
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <Card className="bg-gradient-to-r from-blue-600 to-teal-600 text-white">
            <CardContent className="p-6">
              <h4 className="text-2xl font-bold mb-2">💰 추가 수당 혜택</h4>
              <p className="text-lg mb-4">
                <strong>다양한 수당 지급 시스템</strong>으로 지속적인 수익 창출이 가능하며, 
                새로운 혜택이 계속 업데이트됩니다.
              </p>
              <Button 
                className="bg-white text-blue-600 hover:bg-gray-100 font-semibold"
              >
                추가수당 자세히 보기
              </Button>
            </CardContent>
          </Card>
        </div>

      </div>
    </section>
  );
}