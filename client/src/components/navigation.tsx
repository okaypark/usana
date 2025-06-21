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
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-usana-blue-800 flex items-center">
              <Leaf className="text-usana-green-600 mr-2 h-8 w-8" />
              USANA 건강 파트너
            </div>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="text-gray-700 hover:text-usana-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <Button
                onClick={() => handleNavClick("contact")}
                className="bg-usana-orange-600 hover:bg-usana-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium"
              >
                상담신청
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
                      className="text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-usana-blue-600 transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
                  <Button
                    onClick={() => handleNavClick("contact")}
                    className="bg-usana-orange-600 hover:bg-usana-orange-500 text-white mt-4"
                  >
                    상담신청
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
