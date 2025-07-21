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
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <button 
              onClick={handleLogoClick}
              className="text-2xl font-bold text-usana-blue-900 flex items-center hover:text-usana-blue-700 transition-all duration-300 cursor-pointer group"
            >
              <img 
                src={usanaLogo} 
                alt="USANA Logo" 
                className="mr-3 h-12 w-12 object-contain filter brightness-0 saturate-100 group-hover:scale-105 transition-all duration-300" 
                style={{filter: 'brightness(0) saturate(100%) invert(19%) sepia(85%) saturate(1600%) hue-rotate(206deg) brightness(98%) contrast(94%)'}}
              />
              <span className="tracking-tight">유사나</span>
              <span className="text-usana-blue-600 ml-2 font-light tracking-wide">건강구독 마케팅</span>
            </button>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="text-usana-blue-700 hover:text-usana-blue-500 px-4 py-2 text-sm font-semibold tracking-wide uppercase transition-all duration-300 relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-usana-blue-500 group-hover:w-full transition-all duration-300"></span>
                </button>
              ))}
              <Button
                onClick={() => setConsultationOpen(true)}
                className="bg-usana-blue-600 hover:bg-usana-blue-700 text-white px-6 py-3 rounded-sm text-sm font-semibold tracking-wide uppercase shadow-lg hover:shadow-xl transition-all duration-300"
              >
                건강구독 상담
              </Button>
              <button
                onClick={() => window.location.href = '/admin'}
                className="text-gray-300 hover:text-gray-500 text-xs font-light opacity-30 hover:opacity-60 transition-opacity duration-500 ml-2"
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
                      className="text-left px-4 py-3 text-base font-semibold text-usana-blue-800 hover:text-usana-blue-500 transition-colors tracking-wide"
                    >
                      {item.label}
                    </button>
                  ))}
                  <Button
                    onClick={() => {
                      setConsultationOpen(true);
                      setIsOpen(false);
                    }}
                    className="bg-usana-blue-600 hover:bg-usana-blue-700 text-white mt-6 font-semibold tracking-wide"
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
