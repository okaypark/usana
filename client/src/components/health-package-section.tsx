import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, type Package as PackageType, type PackageProduct } from "@shared/schema";
import ConsultationPopup from "./consultation-popup";

export default function HealthPackageSection() {
  const [selectedPackage, setSelectedPackage] = useState<{type: string; theme: string} | null>(null);
  const [isConsultationPopupOpen, setIsConsultationPopupOpen] = useState(false);

  // 패키지 데이터 조회
  const { data: packages = [] } = useQuery<PackageType[]>({
    queryKey: ['/api/public/packages'],
    queryFn: async () => {
      const response = await fetch('/api/public/packages');
      if (!response.ok) {
        throw new Error('Failed to fetch packages');
      }
      return response.json();
    },
  });

  // 모든 패키지의 제품 데이터 조회
  const allPackageProductsQuery = useQuery({
    queryKey: ['/api/public/all-packages-products'],
    queryFn: async () => {
      const results: Record<string, PackageProduct[]> = {};
      
      for (const pkg of packages) {
        try {
          const response = await fetch(`/api/public/packages/${pkg.id}/products`);
          if (response.ok) {
            const products = await response.json();
            results[`${pkg.theme}_${pkg.type}`] = products;
          }
        } catch (error) {
          console.error(`Error fetching products for ${pkg.theme}_${pkg.type}:`, error);
          results[`${pkg.theme}_${pkg.type}`] = [];
        }
      }
      
      return results;
    },
    enabled: packages.length > 0,
  });

  const packageProductsData = allPackageProductsQuery.data || {};

  // 패키지 선택 핸들러 (토글 방식)
  const handlePackageClick = (type: string, theme: string) => {
    // 같은 패키지를 다시 클릭하면 접기
    if (selectedPackage?.type === type && selectedPackage?.theme === theme) {
      setSelectedPackage(null);
    } else {
      setSelectedPackage({ type, theme });
    }
  };

  // 동적 가격 및 포인트 계산 함수 (수량 포함)
  const calculatePackageStats = (products: PackageProduct[]) => {
    if (!products || products.length === 0) {
      return { totalPrice: 0, totalPoints: 0, subscriptionPrice: 0 };
    }

    const totalPrice = products.reduce((sum, product) => {
      // 가격 문자열에서 숫자만 추출 (예: "25,000원" -> 25000)
      const price = parseInt(product.price.replace(/[^0-9]/g, '')) || 0;
      const quantity = product.quantity || 1;
      return sum + (price * quantity);
    }, 0);

    const totalPoints = products.reduce((sum, product) => {
      const quantity = product.quantity || 1;
      return sum + ((product.pointValue || 0) * quantity);
    }, 0);

    const subscriptionPrice = Math.floor(totalPrice * 0.9); // 10% 할인

    return { totalPrice, totalPoints, subscriptionPrice };
  };

  // 선택된 패키지의 데이터 가져오기
  const selectedPackageData = selectedPackage ? packages.find(pkg => 
    pkg.theme === selectedPackage.theme && pkg.type === selectedPackage.type
  ) : null;

  const packageProducts = selectedPackage ? packageProductsData[`${selectedPackage.theme}_${selectedPackage.type}`] || [] : [];

  return (
    <section id="health-packages" className="py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">건강구독 테마별 패키지</h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-2">
            개인 맞춤형 건강 목표에 따른 전문 구독 패키지로 더 스마트한 건강관리를 시작하세요
          </p>
          <p className="text-sm text-gray-500 max-w-xl mx-auto">
            건강상담으로 개인최적맞춤 패키지로 내용 변경될 수 있습니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 면역건강구독 */}
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 hover:border-green-400 transition-all duration-300 hover:shadow-xl">
            <CardContent className="p-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-green-800 mb-6">면역건강구독</h4>
                <div className="flex gap-4 justify-center items-center">
                  <div 
                    className={`border-2 border-green-600 text-green-600 px-4 py-2 rounded-full font-medium text-center cursor-pointer transition-all duration-200 ${
                      selectedPackage?.type === 'standard' && selectedPackage?.theme === '면역건강구독' 
                        ? 'bg-green-600 text-white scale-105' 
                        : 'hover:bg-green-50 hover:scale-105'
                    }`}
                    onClick={() => handlePackageClick('standard', '면역건강구독')}
                  >
                    스탠다드<br />월 {calculatePackageStats(packageProductsData['면역건강구독_standard'] || []).totalPoints}P
                  </div>
                  <div 
                    className={`bg-gradient-to-r from-amber-400 via-yellow-500 to-yellow-600 text-white px-5 py-3 rounded-full font-bold shadow-2xl text-center cursor-pointer transition-all duration-300 border-2 border-amber-300 ${
                      selectedPackage?.type === 'premium' && selectedPackage?.theme === '면역건강구독'
                        ? 'scale-110 shadow-2xl ring-4 ring-amber-200' 
                        : 'hover:scale-105 hover:shadow-2xl hover:ring-2 hover:ring-amber-200'
                    }`}
                    onClick={() => handlePackageClick('premium', '면역건강구독')}
                    style={{
                      background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 25%, #d97706 50%, #b45309 75%, #92400e 100%)',
                      boxShadow: '0 10px 25px rgba(245, 158, 11, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                    }}
                  >
                    ✨ 프리미엄 ✨<br />월 {calculatePackageStats(packageProductsData['면역건강구독_premium'] || []).totalPoints}P
                  </div>
                </div>
                
                {/* 제품구성 상세 정보 */}
                {selectedPackage?.theme === '면역건강구독' && selectedPackageData && (
                  <div className={`mt-4 p-6 rounded-xl border-2 animate-in slide-in-from-top duration-300 ${
                    selectedPackage.type === 'premium' 
                      ? 'bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 border-amber-200 shadow-lg' 
                      : 'bg-green-50 border-green-200'
                  }`}>
                    <div className="text-center mb-4">
                      <h5 className={`font-bold text-lg ${
                        selectedPackage.type === 'premium' ? 'text-amber-800' : 'text-green-800'
                      }`}>
                        {selectedPackageData.name} 제품구성
                      </h5>
                    </div>
                    <div className="space-y-3">
                      {packageProducts.map((product, index) => (
                        <div key={index} className={`flex justify-between items-start p-4 rounded-lg border-2 ${
                          selectedPackage.type === 'premium' 
                            ? 'bg-white border-amber-200 shadow-md hover:shadow-lg transition-shadow' 
                            : 'bg-white border-green-100'
                        }`}>
                          <div className="flex-1 text-left">
                            <div className={`font-semibold ${
                              selectedPackage.type === 'premium' ? 'text-amber-800' : 'text-green-800'
                            }`}>
                              {selectedPackage.type === 'premium' && '🌟 '}{product.productName}
                              {product.quantity && product.quantity > 1 && (
                                <span className="text-sm ml-2 px-2 py-1 bg-green-100 text-green-700 rounded-full font-normal">
                                  x{product.quantity}
                                </span>
                              )}
                            </div>
                            <div className={`text-sm mt-1 ${
                              selectedPackage.type === 'premium' ? 'text-amber-600' : 'text-green-600'
                            }`}>
                              {product.productDescription}
                            </div>
                          </div>
                          <div className={`font-bold text-lg text-right ${
                            selectedPackage.type === 'premium' ? 'text-amber-700' : 'text-green-700'
                          }`}>
                            {product.price}
                          </div>
                        </div>
                      ))}
                      <div className={`p-4 rounded-lg font-bold border-3 ${
                        selectedPackage.type === 'premium' 
                          ? 'bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border-amber-400 shadow-lg' 
                          : 'bg-green-100 text-green-800 border-green-300'
                      }`}>
                        <div className="text-center">
                          <div className="text-lg mb-2">
                            {selectedPackage.type === 'premium' && '👑 '}총구독료
                          </div>
                          <div className="text-xl">
                            월 {calculatePackageStats(packageProducts).subscriptionPrice.toLocaleString()}원 ({calculatePackageStats(packageProducts).totalPoints}P)
                          </div>
                        </div>
                      </div>
                      {selectedPackage.type === 'premium' && (
                        <div className="mt-4 p-3 bg-gradient-to-r from-amber-400 to-yellow-500 text-white rounded-lg text-center">
                          <div className="font-bold">🎁 프리미엄 특별혜택</div>
                          <div className="text-sm mt-1">무료 건강상담 + VIP 고객 전용 서비스 + 우선 배송</div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* 해독다이어트구독 */}
          <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 hover:border-orange-400 transition-all duration-300 hover:shadow-xl">
            <CardContent className="p-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-orange-800 mb-6">해독다이어트구독</h4>
                <div className="flex gap-4 justify-center items-center">
                  <div 
                    className={`border-2 border-orange-600 text-orange-600 px-4 py-2 rounded-full font-medium text-center cursor-pointer transition-all duration-200 ${
                      selectedPackage?.type === 'standard' && selectedPackage?.theme === '해독다이어트구독' 
                        ? 'bg-orange-600 text-white scale-105' 
                        : 'hover:bg-orange-50 hover:scale-105'
                    }`}
                    onClick={() => handlePackageClick('standard', '해독다이어트구독')}
                  >
                    <div className="text-sm">스탠다드</div>
                    <div className="text-xs mt-1">월 {calculatePackageStats(packageProductsData['해독다이어트구독_standard'] || []).totalPoints}P</div>
                  </div>
                  <div 
                    className={`bg-gradient-to-r from-amber-400 via-yellow-500 to-yellow-600 text-white px-5 py-3 rounded-full font-bold shadow-2xl text-center cursor-pointer transition-all duration-300 border-2 border-amber-300 ${
                      selectedPackage?.type === 'premium' && selectedPackage?.theme === '해독다이어트구독'
                        ? 'scale-110 shadow-2xl ring-4 ring-amber-200' 
                        : 'hover:scale-105 hover:shadow-2xl hover:ring-2 hover:ring-amber-200'
                    }`}
                    onClick={() => handlePackageClick('premium', '해독다이어트구독')}
                    style={{
                      background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 25%, #d97706 50%, #b45309 75%, #92400e 100%)',
                      boxShadow: '0 10px 25px rgba(245, 158, 11, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                    }}
                  >
                    <div className="text-sm">✨ 프리미엄 ✨</div>
                    <div className="text-xs mt-1">월 {calculatePackageStats(packageProductsData['해독다이어트구독_premium'] || []).totalPoints}P</div>
                  </div>
                </div>
                
                {/* 제품구성 상세 정보 */}
                {selectedPackage?.theme === '해독다이어트구독' && selectedPackageData && (
                  <div className={`mt-4 p-6 rounded-xl border-2 animate-in slide-in-from-top duration-300 ${
                    selectedPackage.type === 'premium' 
                      ? 'bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 border-amber-200 shadow-lg' 
                      : 'bg-orange-50 border-orange-200'
                  }`}>
                    <div className="text-center mb-4">
                      <h5 className={`font-bold text-lg ${
                        selectedPackage.type === 'premium' ? 'text-amber-800' : 'text-orange-800'
                      }`}>
                        {selectedPackageData.name} 제품구성
                      </h5>
                    </div>
                    <div className="space-y-3">
                      {packageProducts.map((product, index) => (
                        <div key={index} className={`flex justify-between items-start p-4 rounded-lg border-2 ${
                          selectedPackage.type === 'premium' 
                            ? 'bg-white border-amber-200 shadow-md hover:shadow-lg transition-shadow' 
                            : 'bg-white border-orange-100'
                        }`}>
                          <div className="flex-1">
                            <div className={`font-semibold ${
                              selectedPackage.type === 'premium' ? 'text-amber-800' : 'text-orange-800'
                            }`}>
                              {selectedPackage.type === 'premium' && '🌟 '}{product.productName}
                              {product.quantity && product.quantity > 1 && (
                                <span className="text-sm ml-2 px-2 py-1 bg-orange-100 text-orange-700 rounded-full font-normal">
                                  x{product.quantity}
                                </span>
                              )}
                            </div>
                            <div className={`text-sm mt-1 ${
                              selectedPackage.type === 'premium' ? 'text-amber-600' : 'text-orange-600'
                            }`}>
                              {product.productDescription}
                            </div>
                          </div>
                          <div className={`font-bold text-lg ${
                            selectedPackage.type === 'premium' ? 'text-amber-700' : 'text-orange-700'
                          }`}>
                            {product.price}
                          </div>
                        </div>
                      ))}
                      <div className={`flex justify-between items-center p-4 rounded-lg font-bold border-3 ${
                        selectedPackage.type === 'premium' 
                          ? 'bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border-amber-400 shadow-lg' 
                          : 'bg-orange-100 text-orange-800 border-orange-300'
                      }`}>
                        <span className="text-lg">
                          {selectedPackage.type === 'premium' && '👑 '}총 구독료
                        </span>
                        <span className="text-xl">
                          월 {calculatePackageStats(packageProducts).subscriptionPrice.toLocaleString()}원 ({calculatePackageStats(packageProducts).totalPoints}P)
                        </span>
                      </div>
                      {selectedPackage.type === 'premium' && (
                        <div className="mt-4 p-3 bg-gradient-to-r from-amber-400 to-yellow-500 text-white rounded-lg text-center">
                          <div className="font-bold">🎁 프리미엄 특별혜택</div>
                          <div className="text-sm mt-1">무료 건강상담 + VIP 고객 전용 서비스 + 우선 배송</div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* 피부건강구독 */}
          <Card className="bg-gradient-to-br from-pink-50 to-purple-50 border-2 border-pink-200 hover:border-pink-400 transition-all duration-300 hover:shadow-xl">
            <CardContent className="p-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0112.12 15.12z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-pink-800 mb-6">피부건강구독</h4>
                <div className="flex gap-4 justify-center items-center">
                  <div 
                    className={`border-2 border-pink-600 text-pink-600 px-4 py-2 rounded-full font-medium text-center cursor-pointer transition-all duration-200 ${
                      selectedPackage?.type === 'standard' && selectedPackage?.theme === '피부건강구독' 
                        ? 'bg-pink-600 text-white scale-105' 
                        : 'hover:bg-pink-50 hover:scale-105'
                    }`}
                    onClick={() => handlePackageClick('standard', '피부건강구독')}
                  >
                    스탠다드<br />월 {calculatePackageStats(packageProductsData['피부건강구독_standard'] || []).totalPoints}P
                  </div>
                  <div 
                    className={`bg-gradient-to-r from-amber-400 via-yellow-500 to-yellow-600 text-white px-5 py-3 rounded-full font-bold shadow-2xl text-center cursor-pointer transition-all duration-300 border-2 border-amber-300 ${
                      selectedPackage?.type === 'premium' && selectedPackage?.theme === '피부건강구독'
                        ? 'scale-110 shadow-2xl ring-4 ring-amber-200' 
                        : 'hover:scale-105 hover:shadow-2xl hover:ring-2 hover:ring-amber-200'
                    }`}
                    onClick={() => handlePackageClick('premium', '피부건강구독')}
                    style={{
                      background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 25%, #d97706 50%, #b45309 75%, #92400e 100%)',
                      boxShadow: '0 10px 25px rgba(245, 158, 11, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                    }}
                  >
                    ✨ 프리미엄 ✨<br />월 {calculatePackageStats(packageProductsData['피부건강구독_premium'] || []).totalPoints}P
                  </div>
                </div>
                
                {/* 제품구성 상세 정보 */}
                {selectedPackage?.theme === '피부건강구독' && selectedPackageData && (
                  <div className={`mt-4 p-6 rounded-xl border-2 animate-in slide-in-from-top duration-300 ${
                    selectedPackage.type === 'premium' 
                      ? 'bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 border-amber-200 shadow-lg' 
                      : 'bg-pink-50 border-pink-200'
                  }`}>
                    <div className="text-center mb-4">
                      <h5 className={`font-bold text-lg ${
                        selectedPackage.type === 'premium' ? 'text-amber-800' : 'text-pink-800'
                      }`}>
                        {selectedPackageData.name} 제품구성
                      </h5>
                    </div>
                    <div className="space-y-3">
                      {packageProducts.map((product, index) => (
                        <div key={index} className={`flex justify-between items-start p-4 rounded-lg border-2 ${
                          selectedPackage.type === 'premium' 
                            ? 'bg-white border-amber-200 shadow-md hover:shadow-lg transition-shadow' 
                            : 'bg-white border-pink-100'
                        }`}>
                          <div className="flex-1">
                            <div className={`font-semibold ${
                              selectedPackage.type === 'premium' ? 'text-amber-800' : 'text-pink-800'
                            }`}>
                              {selectedPackage.type === 'premium' && '🌟 '}{product.productName}
                              {product.quantity && product.quantity > 1 && (
                                <span className="text-sm ml-2 px-2 py-1 bg-pink-100 text-pink-700 rounded-full font-normal">
                                  x{product.quantity}
                                </span>
                              )}
                            </div>
                            <div className={`text-sm mt-1 ${
                              selectedPackage.type === 'premium' ? 'text-amber-600' : 'text-pink-600'
                            }`}>
                              {product.productDescription}
                            </div>
                          </div>
                          <div className={`font-bold text-lg ${
                            selectedPackage.type === 'premium' ? 'text-amber-700' : 'text-pink-700'
                          }`}>
                            {product.price}
                          </div>
                        </div>
                      ))}
                      <div className={`flex justify-between items-center p-4 rounded-lg font-bold border-3 ${
                        selectedPackage.type === 'premium' 
                          ? 'bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border-amber-400 shadow-lg' 
                          : 'bg-pink-100 text-pink-800 border-pink-300'
                      }`}>
                        <span className="text-lg">
                          {selectedPackage.type === 'premium' && '👑 '}총 구독료
                        </span>
                        <span className="text-xl">
                          월 {calculatePackageStats(packageProducts).subscriptionPrice.toLocaleString()}원 ({calculatePackageStats(packageProducts).totalPoints}P)
                        </span>
                      </div>
                      {selectedPackage.type === 'premium' && (
                        <div className="mt-4 p-3 bg-gradient-to-r from-amber-400 to-yellow-500 text-white rounded-lg text-center">
                          <div className="font-bold">🎁 프리미엄 특별혜택</div>
                          <div className="text-sm mt-1">무료 건강상담 + VIP 고객 전용 서비스 + 우선 배송</div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 상담 문의 섹션 */}
        <div className="mt-16 text-center">
          <p className="text-lg text-gray-600 mb-6">
            나에게 맞는 건강구독 패키지를 추천받고, 전문 상담을 통해 건강한 시작을 해보세요
          </p>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-semibold px-8 py-3 text-lg shadow-xl hover:scale-105 transition-all duration-300"
            onClick={() => setIsConsultationPopupOpen(true)}
          >
            패키지 문의하기
          </Button>
        </div>

        {/* 상담 팝업 */}
        <ConsultationPopup
          isOpen={isConsultationPopupOpen}
          onClose={() => setIsConsultationPopupOpen(false)}
          title="패키지 문의 및 상담"
          description="전문 상담을 통해 나에게 맞는 건강구독 패키지를 추천받아보세요."
        />
      </div>
    </section>
  );
}