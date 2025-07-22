import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import usanaLogo from "@assets/KakaoTalk_20230825_111922478_1752985727668.png";
import { scrollToSection } from "@/lib/utils";
import ConsultationDialog from "@/components/consultation-dialog";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [consultationOpen, setConsultationOpen] = useState(false);

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
              className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-usana-blue-900 flex items-center hover:text-usana-blue-700 transition-all duration-300 cursor-pointer group"
            >
              <img 
                src={usanaLogo} 
                alt="USANA Logo" 
                className="mr-2 sm:mr-3 h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 object-contain filter brightness-0 saturate-100 group-hover:scale-105 group-hover:rotate-6 transition-all duration-300" 
                style={{filter: 'brightness(0) saturate(100%) invert(19%) sepia(85%) saturate(1600%) hue-rotate(206deg) brightness(98%) contrast(94%)'}}
              />
              <span className="tracking-tight group-hover:scale-105 transition-transform duration-300">유사나</span>
              <span className="ml-1 sm:ml-2 font-bold tracking-wide marketing-text-vibrant group-hover:scale-110 transition-transform duration-300">
                건강구독 마케팅
              </span>
            </button>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-4 lg:ml-10 flex items-center space-x-3 lg:space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="text-usana-blue-700 hover:text-usana-blue-500 px-2 lg:px-4 py-2 text-xs md:text-sm lg:text-base font-semibold tracking-wide uppercase transition-all duration-300 relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-usana-blue-500 group-hover:w-full transition-all duration-300"></span>
                </button>
              ))}
              <Button
                onClick={() => setConsultationOpen(true)}
                className="bg-usana-blue-600 hover:bg-usana-blue-700 text-white px-3 lg:px-6 py-2 lg:py-3 rounded-sm text-xs md:text-sm lg:text-base font-semibold tracking-wide uppercase shadow-lg hover:shadow-xl transition-all duration-300"
              >
                건강구독 상담
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
      
      <ConsultationDialog 
        open={consultationOpen} 
        onOpenChange={setConsultationOpen} 
      />
    </nav>
  );
}
