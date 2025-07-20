import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Leaf } from "lucide-react";
import { scrollToSection } from "@/lib/utils";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "제품소개", href: "products" },
    { label: "건강구독", href: "subscription" },
    { label: "사업기회", href: "business" },
    { label: "소개", href: "about" },
    { label: "Q&A", href: "qna" },
  ];

  const handleNavClick = (href: string) => {
    scrollToSection(href);
    setIsOpen(false);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-xl border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-usana-blue-900 flex items-center">
              <Leaf className="text-usana-blue-500 mr-3 h-8 w-8" />
              <span className="tracking-tight">USANA</span>
              <span className="text-usana-blue-600 ml-2 font-light tracking-wide">BUSINESS</span>
            </div>
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
                onClick={() => handleNavClick("contact")}
                className="bg-usana-blue-600 hover:bg-usana-blue-700 text-white px-6 py-3 rounded-sm text-sm font-semibold tracking-wide uppercase shadow-lg hover:shadow-xl transition-all duration-300"
              >
                전문 상담
              </Button>
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
                    onClick={() => handleNavClick("contact")}
                    className="bg-usana-blue-600 hover:bg-usana-blue-700 text-white mt-6 font-semibold tracking-wide"
                  >
                    전문 상담
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
