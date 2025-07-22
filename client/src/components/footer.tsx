import usanaLogo from "@assets/KakaoTalk_20230825_111922478_1752985727668.png";
import blogIcon from "@assets/스크린샷 2025-07-20 175217_1753001646225.png";
import talkIcon from "@assets/스크린샷 2025-07-20 175222_1753001694463.png";
import instaIcon from "@assets/스크린샷 2025-07-20 175627_1753001814175.png";
import youtubeIcon from "@assets/스크린샷 2025-07-20 175615_1753001849693.png";
import { MessageCircle, Phone, Mail, Instagram, Youtube, Globe } from "lucide-react";
import { openKakaoChat, callPhone } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

export default function Footer() {
  // 사이트 설정 불러오기
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

  const quickLinks = [
    { label: "제품소개", href: "products" },
    { label: "건강구독", href: "health-packages" },
    { label: "사업기회", href: "free-subscription" },
    { label: "소개", href: "about" },
    { label: "Q&A", href: "qna" }
  ];

  const productCategories = [
    { name: "건강기능식품", url: "https://okay7.usana.com/s/1m1hw" },
    { name: "셀라비브 스킨케어", url: "https://okay7.usana.com/s/J2UF_" },
    { name: "다이어트·해독", url: "https://okay7.usana.com/s/zY-ze1" }
  ];

  const contactInfo = {
    phone: "010-4259-5311",
    email: "okaypark7@gmail.com",
    kakao: "holicotu"
  };

  const handleSectionClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold mb-6 flex items-center">
              <img 
                src={usanaLogo} 
                alt="USANA Logo" 
                className="mr-2 sm:mr-3 h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 object-contain filter brightness-0 invert opacity-80" 
              />
              <span className="tracking-tight">유사나</span>
              <span className="text-usana-blue-400 ml-1 sm:ml-2 font-semibold tracking-wide whitespace-nowrap">건강구독마케팅</span>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              당신의 건강과 경제적 자유를 실현할 수 있도록 성심성의껏 함께 하겠습니다.<br />
              <span className="text-usana-blue-400 font-semibold">유사나 브랜드 파트너</span><br />
              <span className="text-usana-blue-400 font-semibold">박현진</span> 📞 010-4259-5311
            </p>
            <div className="flex space-x-4">
              {/* 블로그 링크 */}
              {siteSettings.find(s => s.key === 'show_blog')?.value === 'true' && 
               siteSettings.find(s => s.key === 'blog_url')?.value && (
                <a 
                  href={siteSettings.find(s => s.key === 'blog_url')?.value || '#'}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:scale-110 transition-transform"
                >
                  <img 
                    src={blogIcon} 
                    alt="Blog" 
                    className="h-8 w-8 object-contain" 
                  />
                </a>
              )}

              {/* 카카오톡 링크 */}
              {siteSettings.find(s => s.key === 'show_kakao')?.value === 'true' && 
               siteSettings.find(s => s.key === 'openchat_url')?.value && (
                <a 
                  href={siteSettings.find(s => s.key === 'openchat_url')?.value || '#'}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:scale-110 transition-transform"
                >
                  <img 
                    src={talkIcon} 
                    alt="KakaoTalk" 
                    className="h-8 w-8 object-contain" 
                  />
                </a>
              )}

              {/* 인스타그램 링크 */}
              {siteSettings.find(s => s.key === 'show_instagram')?.value === 'true' && 
               siteSettings.find(s => s.key === 'instagram_url')?.value && (
                <a 
                  href={siteSettings.find(s => s.key === 'instagram_url')?.value || '#'}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:scale-110 transition-transform"
                >
                  <img 
                    src={instaIcon} 
                    alt="Instagram" 
                    className="h-8 w-8 object-contain" 
                  />
                </a>
              )}

              {/* 유튜브 링크 */}
              {siteSettings.find(s => s.key === 'show_youtube')?.value === 'true' && 
               siteSettings.find(s => s.key === 'youtube_url')?.value && (
                <a 
                  href={siteSettings.find(s => s.key === 'youtube_url')?.value || '#'}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:scale-110 transition-transform"
                >
                  <img 
                    src={youtubeIcon} 
                    alt="Youtube" 
                    className="h-8 w-8 object-contain" 
                  />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">빠른 링크</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleSectionClick(link.href)}
                    className="text-gray-300 hover:text-white transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-lg font-semibold mb-4">제품 카테고리</h4>
            <ul className="space-y-2">
              {productCategories.map((category, index) => (
                <li key={index}>
                  <a 
                    href={category.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors text-left block"
                  >
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">연락처</h4>
            <div className="space-y-3 text-gray-300">
              <button 
                onClick={() => callPhone("010-4259-5311")}
                className="flex items-center hover:text-white transition-colors group"
              >
                <div className="text-xl mr-3">📞</div>
                <span className="text-sm group-hover:underline">{contactInfo.phone}</span>
              </button>
              <button 
                onClick={openKakaoChat}
                className="flex items-center hover:text-white transition-colors group"
              >
                <img 
                  src={talkIcon} 
                  alt="KakaoTalk" 
                  className="h-5 w-5 object-contain mr-3" 
                />
                <span className="text-sm group-hover:underline">카톡아이디: {contactInfo.kakao}</span>
              </button>
              <button 
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="flex items-center hover:text-white transition-colors group"
              >
                <div className="text-xl mr-3">📧</div>
                <span className="text-sm group-hover:underline">{contactInfo.email}</span>
              </button>
              <div className="flex items-center text-gray-400">
                <span className="text-sm">🕐 밤 12시까지 언제든지</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div className="text-gray-400 text-sm">
              <p>&copy; 2025 USANA 브랜드 파트너 박현진. All rights reserved.</p>
              <p className="mt-1">USANA Health Sciences는 미국 유타주에 본사를 둔 글로벌 건강기능식품 기업입니다.</p>
            </div>
            <div className="text-gray-400 text-sm md:text-right">
              <div className="flex flex-col md:items-end space-y-1">
                <p>공정거래위원회 신고번호: 제2023-서울-0123호</p>
                <div className="flex space-x-4">
                  <button className="hover:text-white transition-colors">개인정보처리방침</button>
                  <button className="hover:text-white transition-colors">이용약관</button>
                  <button className="hover:text-white transition-colors">사업자정보확인</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
