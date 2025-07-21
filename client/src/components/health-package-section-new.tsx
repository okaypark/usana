import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, type Package as PackageType, type PackageProduct } from "@shared/schema";

export default function HealthPackageSection() {
  const [selectedPackage, setSelectedPackage] = useState<{type: string; theme: string} | null>(null);

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

  // 테마별로 패키지 그룹화 및 자동 배열
  const groupedPackages = packages.reduce((acc, pkg) => {
    if (!acc[pkg.theme]) {
      acc[pkg.theme] = [];
    }
    acc[pkg.theme].push(pkg);
    return acc;
  }, {} as Record<string, PackageType[]>);

  // 패키지 선택 핸들러 (토글 방식)
  const handlePackageClick = (type: string, theme: string) => {
    if (selectedPackage?.type === type && selectedPackage?.theme === theme) {
      setSelectedPackage(null);
    } else {
      setSelectedPackage({ type, theme });
    }
  };

  // 동적 가격 및 포인트 계산 함수
  const calculatePackageStats = (products: PackageProduct[]) => {
    if (!products || products.length === 0) {
      return { totalPrice: 0, totalPoints: 0, subscriptionPrice: 0 };
    }

    const totalPrice = products.reduce((sum, product) => {
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

  // 테마별 색상 설정
  const getThemeColors = (theme: string) => {
    switch (theme) {
      case '면역건강':
        return {
          card: 'from-green-50 to-emerald-50 border-green-200 hover:border-green-400',
          icon: 'bg-green-500',
          text: 'text-green-800',
          button: 'border-green-600 text-green-600 hover:bg-green-50',
          selected: 'bg-green-600 text-white'
        };
      case '해독다이어트':
        return {
          card: 'from-orange-50 to-red-50 border-orange-200 hover:border-orange-400',
          icon: 'bg-orange-500',
          text: 'text-orange-800',
          button: 'border-orange-600 text-orange-600 hover:bg-orange-50',
          selected: 'bg-orange-600 text-white'
        };
      case '피부건강':
        return {
          card: 'from-pink-50 to-rose-50 border-pink-200 hover:border-pink-400',
          icon: 'bg-pink-500',
          text: 'text-pink-800',
          button: 'border-pink-600 text-pink-600 hover:bg-pink-50',
          selected: 'bg-pink-600 text-white'
        };
      default:
        return {
          card: 'from-blue-50 to-indigo-50 border-blue-200 hover:border-blue-400',
          icon: 'bg-blue-500',
          text: 'text-blue-800',
          button: 'border-blue-600 text-blue-600 hover:bg-blue-50',
          selected: 'bg-blue-600 text-white'
        };
    }
  };

  // 아이콘 선택
  const getThemeIcon = (theme: string) => {
    switch (theme) {
      case '면역건강':
        return (
          <svg className="w-full h-full text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
          </svg>
        );
      case '해독다이어트':
        return (
          <svg className="w-full h-full text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case '피부건강':
        return (
          <svg className="w-full h-full text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        );
      default:
        return (
          <svg className="w-full h-full text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  // 타입 표시 이름
  const getTypeDisplayName = (type: string) => {
    switch (type) {
      case 'standard': return '스탠다드';
      case 'premium': return '프리미엄';
      case 'deluxe': return '디럭스';
      default: return type;
    }
  };

  const selectedPackageData = selectedPackage ? packages.find(pkg => 
    pkg.theme === selectedPackage.theme && pkg.type === selectedPackage.type
  ) : null;

  const packageProducts = selectedPackage ? packageProductsData[`${selectedPackage.theme}_${selectedPackage.type}`] || [] : [];

  return (
    <section id="health-packages" className="py-16 sm:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-4">건강구독 테마별 패키지</h3>
          <p className="text-lg md:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto mb-2">
            개인 맞춤형 건강 목표에 따른 전문 구독 패키지로<br />
            더 스마트한 건강관리를 시작하세요
          </p>
          <p className="text-lg md:text-base text-gray-500 max-w-xl mx-auto">
            건강상담으로 패키지 내용은 변경될 수 있습니다.
          </p>
        </div>

        {/* 동적 패키지 그리드 */}
        <div className={`grid gap-8 ${
          Object.keys(groupedPackages).length === 1 
            ? 'grid-cols-1 max-w-2xl mx-auto'
            : Object.keys(groupedPackages).length === 2 
            ? 'grid-cols-1 md:grid-cols-2'
            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        }`}>
          {Object.entries(groupedPackages).map(([theme, themePackages]) => {
            const colors = getThemeColors(theme);
            
            return (
              <Card key={theme} className={`bg-gradient-to-br ${colors.card} border-2 transition-all duration-300 hover:shadow-xl`}>
                <CardContent className="p-10">
                  <div className="text-center">
                    {/* 테마 아이콘 */}
                    <div className={`w-20 h-20 ${colors.icon} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                      <div className="w-10 h-10 text-white">
                        {getThemeIcon(theme)}
                      </div>
                    </div>
                    
                    {/* 테마 제목 */}
                    <h4 className={`text-3xl sm:text-4xl md:text-4xl lg:text-4xl xl:text-5xl font-extrabold ${colors.text} mb-8 tracking-tight`}>{theme}</h4>
                    
                    {/* 패키지 타입들 */}
                    <div className="flex gap-4 justify-center items-center flex-wrap md:flex-row">
                      {themePackages
                        .sort((a, b) => a.type.localeCompare(b.type))
                        .map((pkg) => {
                          const products = packageProductsData[`${pkg.theme}_${pkg.type}`] || [];
                          const stats = calculatePackageStats(products);
                          const isSelected = selectedPackage?.type === pkg.type && selectedPackage?.theme === pkg.theme;
                          
                          return (
                            <div
                              key={pkg.id}
                              className={`border-2 px-4 py-2 rounded-full font-medium text-center cursor-pointer transition-all duration-200 ${
                                pkg.type === 'premium' 
                                  ? `bg-gradient-to-r from-amber-400 via-yellow-500 to-yellow-600 text-white shadow-2xl border-amber-300 ${
                                      isSelected ? 'scale-110 ring-4 ring-amber-200' : 'hover:scale-105 hover:ring-2 hover:ring-amber-200'
                                    }`
                                  : isSelected 
                                    ? `${colors.selected} scale-105` 
                                    : `${colors.button} hover:scale-105`
                              }`}
                              onClick={() => handlePackageClick(pkg.type, pkg.theme)}
                              style={pkg.type === 'premium' ? {
                                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 25%, #d97706 50%, #b45309 75%, #92400e 100%)',
                                boxShadow: '0 10px 25px rgba(245, 158, 11, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                              } : {}}
                            >
                              <div className="text-lg">
                                {pkg.type === 'premium' && '✨ '}{getTypeDisplayName(pkg.type)}{pkg.type === 'premium' && ' ✨'}
                              </div>
                              <div className="text-base mt-1">
                                월 {stats.totalPoints || 0}P
                              </div>
                            </div>
                          );
                        })}
                    </div>
                    
                    {/* 제품구성 상세 정보 */}
                    {selectedPackage?.theme === theme && selectedPackageData && (
                      <div className={`mt-4 p-6 rounded-xl border-2 animate-in slide-in-from-top duration-300 ${
                        selectedPackage.type === 'premium' 
                          ? 'bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 border-amber-200 shadow-lg' 
                          : `bg-${theme === '면역건강' ? 'green' : theme === '해독다이어트' ? 'orange' : 'pink'}-50 border-${theme === '면역건강' ? 'green' : theme === '해독다이어트' ? 'orange' : 'pink'}-200`
                      }`}>
                        <div className="text-center mb-4">
                          <h5 className={`font-bold text-lg ${
                            selectedPackage.type === 'premium' ? 'text-amber-800' : colors.text
                          }`}>
                            {selectedPackageData.name} 제품구성
                          </h5>
                        </div>
                        <div className="space-y-3">
                          {packageProducts.map((product, index) => (
                            <div key={index} className={`flex justify-between items-start p-4 rounded-lg border-2 ${
                              selectedPackage.type === 'premium' 
                                ? 'bg-white border-amber-200 shadow-md hover:shadow-lg transition-shadow' 
                                : 'bg-white border-gray-100'
                            }`}>
                              <div className="flex-1 text-left">
                                <div className={`font-semibold ${
                                  selectedPackage.type === 'premium' ? 'text-amber-800' : colors.text
                                }`}>
                                  {selectedPackage.type === 'premium' && '🌟 '}{product.productName}
                                  {product.quantity && product.quantity > 1 && (
                                    <span className="text-sm ml-2 px-2 py-1 bg-green-100 text-green-700 rounded-full font-normal">
                                      x{product.quantity}
                                    </span>
                                  )}
                                </div>

                              </div>
                              <div className={`font-bold text-lg text-right ${
                                selectedPackage.type === 'premium' ? 'text-amber-700' : colors.text
                              }`}>
                                {parseInt(product.price.replace(/[^0-9]/g, '') || '0').toLocaleString('ko-KR')}원
                              </div>
                            </div>
                          ))}
                          <div className={`p-4 rounded-lg font-bold border-3 ${
                            selectedPackage.type === 'premium' 
                              ? 'bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border-amber-400 shadow-lg' 
                              : `bg-${theme === '면역건강' ? 'green' : theme === '해독다이어트' ? 'orange' : 'pink'}-100 ${colors.text} border-${theme === '면역건강' ? 'green' : theme === '해독다이어트' ? 'orange' : 'pink'}-300`
                          }`}>
                            <div className="text-center">
                              <div className="text-lg mb-2">
                                {selectedPackage.type === 'premium' && '👑 '}총구독료
                              </div>
                              <div className="text-xl">
                                월 {calculatePackageStats(packageProducts).subscriptionPrice.toLocaleString('ko-KR')}원 ({calculatePackageStats(packageProducts).totalPoints}P)
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
            );
          })}
        </div>
      </div>
    </section>
  );
}