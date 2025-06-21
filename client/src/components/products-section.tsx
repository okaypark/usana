import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Pill, Sparkles, Dumbbell, Check } from "lucide-react";
import nutritionImage from "@assets/4198d663-2e1d-4ab0-8e3e-60d479e4bd5c.resize-1200x1200_1750520167008.webp";
import celaviveImage from "@assets/Celavive-Full-Line-80-percent-1_1750520337102.jpg";
import activeImage from "@assets/350d86bc4ae64c54a9cb9e65538ef700_raw_1750520755126.jpg";
import dietProductImage from "@assets/2010ca4d-c010-4f90-b826-5e585a679fcf_1750522103001.png";

export default function ProductsSection() {
  const products = [
    {
      title: "뉴트리션 영양제",
      description: "셀센셜, 비타맥스, 프로파넬 등 프리미엄 영양소 보충제로 최적의 건강 관리",
      image: nutritionImage,
      icon: Pill,
      iconColor: "text-usana-green-500",
      iconBg: "bg-usana-green-500",
      buttonColor: "bg-usana-green-600 hover:bg-usana-green-700",
      features: [
        "FDA 승인 시설에서 제조",
        "최고 등급 원료 사용",
        "과학적 검증 완료"
      ]
    },
    {
      title: "셀라비브 스킨케어",
      description: "혁신적인 안티에이징 기술로 젊고 건강한 피부를 위한 프리미엄 화장품",
      image: celaviveImage,
      icon: Sparkles,
      iconColor: "text-pink-500",
      iconBg: "bg-pink-500",
      buttonColor: "bg-pink-600 hover:bg-pink-700",
      features: [
        "독특한 셀룰러 영양 복합체",
        "리뉴잉 젤 마스크",
        "각종 어워드 수상"
      ]
    },
    {
      title: "다이어트 & 웰니스",
      description: "건강한 체중 관리와 활력 넘치는 라이프스타일을 위한 맞춤형 솔루션",
      image: activeImage,
      icon: Dumbbell,
      iconColor: "text-usana-orange-500",
      iconBg: "bg-usana-orange-500",
      buttonColor: "bg-usana-orange-600 hover:bg-usana-orange-700",
      features: [
        "리셋 5일 프로그램",
        "프로틴 바 & 쉐이크",
        "과학적 체중관리법"
      ]
    }
  ];

  return (
    <section id="products" className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">USANA 프리미엄 제품라인</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            과학적으로 검증된 최고 품질의 건강기능식품, 영양제, 화장품으로 건강한 라이프스타일을 지원합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {products.map((product, index) => {
            const Icon = product.icon;
            return (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative w-full h-64 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className={`w-full h-full object-cover ${index === 0 ? 'object-center scale-110' : ''}`}
                  />
                  {index === 2 && (
                    <img 
                      src={dietProductImage}
                      alt="다이어트 제품"
                      className="absolute bottom-4 right-4 w-20 h-20 object-contain"
                    />
                  )}
                </div>
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <div className={`${product.iconBg} p-2 rounded-lg mr-3`}>
                      <Icon className="text-white h-5 w-5" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{product.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-6">{product.description}</p>
                  <ul className="space-y-2 mb-6">
                    {product.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-700">
                        <Check className={`${product.iconColor} mr-2 h-4 w-4`} />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full ${product.buttonColor} text-white font-semibold`}>
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
