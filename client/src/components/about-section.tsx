import { Card, CardContent } from "@/components/ui/card";
import { Building, CheckCircle, Medal, Microscope, Globe, Users, Phone, Mail, MessageSquare } from "lucide-react";
import profileImage from "@assets/241118g2_9590-1_1750521634701.jpg";
import usanaLogo from "@assets/KakaoTalk_20230825_111922478_1753166145952.png";

import { useQuery } from "@tanstack/react-query";

export default function AboutSection() {
  // 사이트 설정에서 자기소개 불러오기
  const { data: siteSettings = [] } = useQuery({
    queryKey: ['/api/site-settings'],
    queryFn: async () => {
      const response = await fetch('/api/site-settings');
      if (!response.ok) {
        throw new Error('Failed to fetch site settings');
      }
      return response.json();
    },
  });

  // 프로필 이미지는 사이트 설정에서 가져오기
  const adminProfileImage = siteSettings.find(s => s.key === 'admin_profile_image')?.value;

  const adminIntro = siteSettings.find(s => s.key === 'admin_intro')?.value || 
    '안녕하세요! 유사나 에메랄드 디렉터 박현진입니다. 건강한 삶과 경제적 자유를 동시에 얻을 수 있는 기회를 제공합니다.';
  
  const profile = {
    name: siteSettings.find(s => s.key === 'admin_name')?.value || "박현진",
    title: "유사나 브랜드 파트너 · 건강 라이프 코치",
    story: adminIntro,
    phone: siteSettings.find(s => s.key === 'admin_phone')?.value || "010-4259-5311",
    email: siteSettings.find(s => s.key === 'admin_email')?.value || "okaypark7@gmail.com",
    kakao: siteSettings.find(s => s.key === 'admin_kakao')?.value || "holicotu"
  };

  // 전문 분야를 동적으로 가져오기
  const expertiseString = siteSettings.find(s => s.key === 'admin_expertise')?.value || 
    "개인맞춤영양 상담, 체중 관리, 무료건강구독 상담, 부업·사업 멘토링";
  const expertise = expertiseString.split(', ').filter(item => item.trim() !== '');

  const companyStrengths = [
    {
      icon: Medal,
      title: "품질 인증",
      description: "FDA 승인 시설, NSF 인증, 비타민 비교가이드 1위 달성 (Comparative Guide to Nutritional Supplements)",
      color: "text-usana-green-500"
    },
    {
      icon: Microscope,
      title: "과학적 검증",
      description: "150명 넘는 과학자들 보유한 자체 연구소 운영, 100편 이상의 학술 논문",
      color: "text-usana-blue-500"
    },
    {
      icon: Globe,
      title: "글로벌 네트워크",
      description: "NYSE 뉴욕증시 상장기업, 24개국 진출, 연매출 1조원 달성",
      color: "text-usana-orange-500"
    },
    {
      icon: Users,
      title: "파트너 지원",
      description: "체계적인 교육 시스템, 전문가 멘토링",
      color: "text-purple-500"
    }
  ];

  const awards = [
    {
      title: "미국 유타주 건강기능식품 부문 13년 연속 Best of State 최고 수상",
      color: "bg-yellow-50 text-yellow-600"
    },
    {
      title: "비교 가이드 건강기능식품 부문 1위 (15년 연속)",
      color: "bg-blue-50 text-blue-600"
    },
    {
      title: "포브스 선정 '아메리카 최고의 중소기업'",
      color: "bg-green-50 text-green-600"
    },
    {
      title: "NSF 국제인증 취득 (세계 최초)",
      color: "bg-purple-50 text-purple-600"
    }
  ];

  return (
    <section id="about" className="py-16 sm:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">소개</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            건강한 라이프스타일과 성공적인 비즈니스를 함께 만들어가는 파트너가 되겠습니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Personal Introduction */}
          <Card className="bg-white shadow-lg">
            <CardContent className="p-8 lg:p-12">
              <div className="text-center mb-8">
                <img
                  src={adminProfileImage || profileImage}
                  alt="박현진 대표 프로필"
                  className="w-48 h-48 rounded-full mx-auto mb-6 shadow-lg object-cover object-top"
                />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{profile.name}</h3>
                <p className="text-usana-blue-600 font-semibold">{profile.title}</p>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">나의 USANA 스토리</h4>
                  <p className="text-gray-700 leading-relaxed">{profile.story}</p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">전문 분야</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {expertise.map((skill, index) => (
                      <div key={index} className="flex items-center text-gray-700">
                        <CheckCircle className="text-usana-green-500 mr-2 h-4 w-4" />
                        <span className="text-sm">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 주요 성과 섹션 */}
                {siteSettings.find(s => s.key === 'admin_achievements')?.value && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">주요 성과</h4>
                    <div className="text-gray-700 leading-relaxed">
                      {siteSettings.find(s => s.key === 'admin_achievements')?.value.split('\n').map((achievement, index) => (
                        <div key={index} className="flex items-start mb-1">
                          <span className="text-sm">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">연락처</h4>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-700">
                      <Phone className="text-usana-blue-500 mr-3 h-4 w-4" />
                      <span className="text-sm">{profile.phone}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Mail className="text-usana-blue-500 mr-3 h-4 w-4" />
                      <span className="text-sm">{profile.email}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <MessageSquare className="text-usana-blue-500 mr-3 h-4 w-4" />
                      <span className="text-sm">{profile.kakao}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Company Introduction */}
          <Card className="bg-white shadow-lg">
            <CardContent className="p-8 lg:p-12">
              <div className="text-center mb-8">
                <div className="w-36 h-36 mx-auto mb-6 flex items-center justify-center">
                  <img 
                    src={usanaLogo} 
                    alt="USANA Health Sciences Logo" 
                    className="w-30 h-30 object-contain filter brightness-0 saturate-100" 
                    style={{filter: 'brightness(0) saturate(100%) invert(19%) sepia(85%) saturate(1600%) hue-rotate(206deg) brightness(98%) contrast(94%)'}}
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">USANA Health Sciences</h3>
                <p className="text-usana-blue-600 font-semibold">글로벌 1위 건강기능식품 기업</p>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">회사 개요</h4>
                  <p className="text-gray-700 leading-relaxed">
                    1974년 연구소를 통해 바이러스진단키트 개발 이후 반백년 넘는 인간세포기술의 집약체로 
                    발전해온 USANA는 미국 유타주에 본사를 둔 글로벌 건강기능식품 기업으로, 
                    현재 24개국에 진출하여 과학적으로 검증된 최고 품질의 제품을 제공하고 있습니다.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">핵심 강점</h4>
                  <div className="space-y-3">
                    {companyStrengths.map((strength, index) => {
                      const Icon = strength.icon;
                      return (
                        <div key={index} className="flex items-start text-gray-700">
                          <Icon className={`${strength.color} mr-3 mt-1 h-5 w-5`} />
                          <div>
                            <strong>{strength.title}:</strong> {strength.description}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">수상 내역</h4>
                  <div className="space-y-2">
                    {awards.map((award, index) => (
                      <div key={index} className={`${award.color} p-3 rounded-lg`}>
                        <span className="text-sm font-medium">{award.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
