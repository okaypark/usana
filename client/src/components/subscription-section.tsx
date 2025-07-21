import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Shield, Zap } from "lucide-react";

export default function SubscriptionSection() {
  return (
    <section id="subscription-innovation" className="py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500/20 to-teal-500/15 border-2 border-blue-500/30 rounded-full mb-8 shadow-xl shadow-blue-500/20">
            <span className="text-blue-700 text-lg font-bold tracking-wider">SUBSCRIPTION INNOVATION</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold text-slate-800 mb-8 tracking-tighter">
            <span className="text-blue-600">돈버는 영양제</span><br />
            <span className="text-teal-600 font-semibold text-4xl lg:text-5xl">구독 혁신</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light mb-12">
            건강을 챙기면서 동시에 <span className="text-blue-600 font-semibold">수익을 창출</span>하는<br />
            <span className="text-teal-600 font-semibold">혁신적인 건강구독 시스템</span>으로<br />
            <span className="text-blue-600 font-bold">스마트한 라이프스타일을 시작하세요</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <Card className="bg-white/80 backdrop-blur border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">건강 관리</h3>
              <p className="text-slate-600 leading-relaxed">
                프리미엄 영양제로 체계적인 건강 관리를 시작하고, 
                건강한 라이프스타일을 유지하세요.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">안정적 시스템</h3>
              <p className="text-slate-600 leading-relaxed">
                검증된 글로벌 네트워크 마케팅 시스템으로 
                지속 가능한 수익 구조를 구축하세요.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">스마트 수익</h3>
              <p className="text-slate-600 leading-relaxed">
                자연스러운 추천 활동을 통해 
                부담 없이 부수익을 창출하는 혁신적 모델입니다.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-semibold px-12 py-4 text-lg shadow-xl"
          >
            건강구독 시작하기
          </Button>
        </div>

      </div>
    </section>
  );
}