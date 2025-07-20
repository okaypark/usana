import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Pill, Sparkles, Dumbbell, Check } from "lucide-react";
import nutritionImage from "@assets/스크린샷 2025-06-22 012157_1750522931098.png";
import celaviveImage from "@assets/Celavive-Full-Line-80-percent-1_1750520337102.jpg";
import activeImage from "@assets/350d86bc4ae64c54a9cb9e65538ef700_raw_1750520755126.jpg";
import dietProductImage from "@assets/2010ca4d-c010-4f90-b826-5e585a679fcf_1750522103001.png";
import usaFlag from "@assets/미국국기_1752999123362.jpg";

export default function ProductsSection() {
  const products = [
    {
      title: "뉴트리션 영양제",
      description: "종합비타민 헬스팩 중심으로 혈행·혈압·항산화·면역력·해독·다이어트·수명연장 등 각 장기별 개인맞춤 영양제 조합",
      image: nutritionImage,
      icon: Pill,
      iconColor: "text-usana-green-500",
      iconBg: "bg-usana-green-500",
      buttonColor: "bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200",
      features: [
        "FDA 의약품제조시설 인증, 매년 검증",
        "북미 1위 12년 연속 생체이용률 96.1%",
        "한국 건강기능식품 대상 4회 이상 수상"
      ]
    },
    {
      title: "셀라비브 스킨케어",
      description: "펩타이드 독점성분 인셀리전스 테크놀로지로 피부내 콜라겐, 엘라스틴, 히알루론산 및 지질 성분을 활성화. 항산화 독점성분 '올리볼' 식물 복합 추출물로 피부에 강력한 항산화 효과",
      image: celaviveImage,
      icon: Sparkles,
      iconColor: "text-sky-500",
      iconBg: "bg-sky-500",
      buttonColor: "bg-sky-600 hover:bg-sky-700",
      features: [
        "펩타이드 독점성분 인셀리전스 테크놀로지",
        "5 FREE: 알러지·파라벤·설페이트·페독시에탄올·합성색소 프리",
        "올리볼 식물 복합 추출물 강력한 항산화"
      ]
    },
    {
      title: "다이어트 & 웰니스",
      description: "건강한 체중 관리와 활력 넘치는 라이프스타일을 위한 맞춤형 솔루션",
      image: activeImage,
      icon: Dumbbell,
      iconColor: "text-pink-500",
      iconBg: "bg-pink-500",
      buttonColor: "bg-pink-600 hover:bg-pink-700",
      features: [
        "리셋 5일 프로그램",
        "프로틴 바 & 쉐이크",
        "과학적 체중관리법"
      ]
    }
  ];

  return (
    <section id="products" className="bg-white py-24 border-t border-usana-platinum-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-usana-blue-500/20 to-usana-blue-600/15 border-2 border-usana-blue-500/30 rounded-full mb-6 shadow-lg shadow-usana-blue-500/20">
            <span className="text-usana-blue-700 text-sm font-bold tracking-wider uppercase">Premium Product Portfolio</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold text-usana-blue-900 mb-6 tracking-tighter">
            <span className="text-usana-blue-600">미국 1위 영양제</span><br />
            <span className="text-usana-blue-600 font-semibold text-4xl lg:text-5xl">USANA 제품소개</span>
          </h2>
          <p className="text-xl text-usana-blue-600 max-w-4xl mx-auto leading-relaxed font-light">
            세계 최고 품질의 영양제와 스킨케어로<br />
            <span className="text-usana-blue-600 font-semibold">건강한 삶</span>을 선물하는<br />
            USANA의 프리미엄 제품 라인업<br />
            <span className="text-usana-blue-600 font-bold text-3xl flex flex-col items-center gap-2">
              <img src={usaFlag} alt="USA Flag" className="w-12 h-16 object-cover" />
              <span className="text-center">100%<br />Made in USA</span>
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {products.map((product, index) => {
            const Icon = product.icon;
            return (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow h-full flex flex-col">
                <div className="relative w-full h-64 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className={`w-full h-full object-cover ${index === 0 ? 'object-center' : ''}`}
                  />
                  {index === 2 && (
                    <img 
                      src={dietProductImage}
                      alt="다이어트 제품"
                      className="absolute bottom-2 right-2 w-40 h-40 object-contain"
                    />
                  )}
                </div>
                <CardContent className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className={`${product.iconBg} p-2 rounded-lg mr-3`}>
                      <Icon className="text-white h-5 w-5" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{product.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-6">{product.description}</p>
                  <ul className="space-y-2 mb-6 flex-1">
                    {product.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-700">
                        <Check className={`${product.iconColor} mr-2 h-4 w-4`} />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${product.buttonColor} text-white font-semibold mt-auto`}
                    onClick={() => {
                      if (index === 0) {
                        window.open('https://hyunjin.usana.com/s/vhlME3', '_blank');
                      } else if (index === 1) {
                        window.open('https://hyunjin.usana.com/s/1wUH21', '_blank');
                      } else if (index === 2) {
                        window.open('https://hyunjin.usana.com/s/Yr7NY', '_blank');
                      }
                    }}
                  >
                    자세히 보기
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
