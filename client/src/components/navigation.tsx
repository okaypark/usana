import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import usanaLogo from "@assets/KakaoTalk_20230825_111922478_1752985727668.png";
import { scrollToSection } from "@/lib/utils";
import ConsultationPopup from "@/components/consultation-popup";
import { useQuery } from "@tanstack/react-query";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [consultationOpen, setConsultationOpen] = useState(false);

  // 사이트 설정 불러오기
  const { data: siteSettings = [] } = useQuery({
    queryKey: ['/api/site-settings'],
    queryFn: async () => {
      const response = await fetch('/api/site-settings');
      return response.json();
    },
  });

  const navItems = [
    { label: "제품소개", href: "products" },
    { label: "건강구독", href: "health-packages" },
    { label: "사업기회", href: "free-subscription" },
    { label: "소개", href: "about" },
    { label: "Q&A", href: "qna" },
  ];

  const handleNavClick = (href: string) => {
    scrollToSection(href);
    setIsOpen(false);
  };

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-xl border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-18 md:h-20 lg:h-24">
          <div className="flex items-center">
            <button 
              onClick={handleLogoClick}
              className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold text-usana-blue-900 flex flex-col items-start hover:text-usana-blue-700 transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-center">
                <img 
                  src={usanaLogo} 
                  alt="USANA Logo" 
                  className="mr-1 sm:mr-2 md:mr-3 h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 xl:h-14 xl:w-14 object-contain filter brightness-0 saturate-100 group-hover:scale-105 group-hover:rotate-6 transition-all duration-300" 
                  style={{filter: 'brightness(0) saturate(100%) invert(19%) sepia(85%) saturate(1600%) hue-rotate(206deg) brightness(98%) contrast(94%)'}}
                />
                <span className="tracking-tight group-hover:scale-105 transition-transform duration-300 whitespace-nowrap">유사나</span>
                <span className="ml-0.5 sm:ml-1 md:ml-2 font-bold tracking-wide marketing-text-vibrant group-hover:scale-110 transition-transform duration-300 whitespace-nowrap">
                  건강구독마케팅
                </span>
              </div>
              <div className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-usana-blue-600 font-medium mt-0.5 sm:mt-1 ml-8 sm:ml-10 md:ml-12 lg:ml-16 xl:ml-20 group-hover:text-usana-blue-500 transition-all duration-300">
                브랜드 파트너 {siteSettings.find(s => s.key === 'admin_name')?.value || '박현진'}
              </div>
            </button>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-2 lg:ml-6 xl:ml-10 flex items-center space-x-1 md:space-x-2 lg:space-x-4 xl:space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="text-usana-blue-700 hover:text-usana-blue-500 px-1 md:px-2 lg:px-3 xl:px-4 py-1 md:py-2 text-xs md:text-sm lg:text-base xl:text-lg font-semibold tracking-wide uppercase transition-all duration-300 relative group whitespace-nowrap"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-usana-blue-500 group-hover:w-full transition-all duration-300"></span>
                </button>
              ))}
              <Button
                onClick={() => setConsultationOpen(true)}
                className="bg-usana-blue-600 hover:bg-usana-blue-700 text-white px-2 md:px-3 lg:px-4 xl:px-6 py-1 md:py-2 lg:py-3 rounded-sm text-xs md:text-sm lg:text-base xl:text-lg font-semibold tracking-wide uppercase shadow-lg hover:shadow-xl transition-all duration-300 whitespace-nowrap"
              >
                건강구독상담
              </Button>
              <button
                onClick={() => window.location.href = '/admin'}
                className="text-gray-300 hover:text-gray-500 text-xs lg:text-sm font-light opacity-30 hover:opacity-60 transition-opacity duration-500 ml-1 lg:ml-2"
              >
                관리자
              </button>
            </div>
          </div>
          
          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <button
                      key={item.href}
                      onClick={() => handleNavClick(item.href)}
                      className="text-left px-4 py-3 text-lg sm:text-xl font-semibold text-usana-blue-800 hover:text-usana-blue-500 transition-colors tracking-wide"
                    >
                      {item.label}
                    </button>
                  ))}
                  <Button
                    onClick={() => {
                      setConsultationOpen(true);
                      setIsOpen(false);
                    }}
                    className="bg-usana-blue-600 hover:bg-usana-blue-700 text-white mt-6 font-semibold tracking-wide text-lg sm:text-xl py-4"
                  >
                    건강구독 상담
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      
      <ConsultationPopup
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
        title="건강구독 상담 신청"
        description="건강한 생활과 수익 창출을 위한 맞춤 상담을 신청하세요."
      />
    </nav>
  );
}
