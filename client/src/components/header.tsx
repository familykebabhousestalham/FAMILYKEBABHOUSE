import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Phone, Zap, Mic } from "lucide-react";
import { useGlobalVoiceControl } from "@/hooks/use-global-voice-control";

interface HeaderProps {
  readonly onAIRecommendationsClick?: () => void;
}

export default function Header({ onAIRecommendationsClick }: HeaderProps) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { startListening } = useGlobalVoiceControl();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "Meal Builder", href: "/meal-builder" },
    { name: "Nutrition", href: "/nutritional-info" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/" && location.pathname === "/") return true;
    if (href !== "/" && location.pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between py-4 md:py-5">
          <Link to="/" className="flex items-center space-x-3 flex-shrink-0">
            <img 
              src="/logo.jpg" 
              alt="Family Kebab House Logo"
              className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
            />
            <div className="min-w-0">
              <h1 className="font-dancing text-xl md:text-2xl font-bold text-charcoal leading-tight">
                Family Kebab
              </h1>
              <p className="text-sm text-gray-600 leading-tight">Kebab & Pizza</p>
            </div>
          </Link>
          
          <nav className="hidden md:flex space-x-4 lg:space-x-6 xl:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`transition-colors font-medium text-sm lg:text-base whitespace-nowrap ${
                  isActive(item.href)
                    ? "text-primary"
                    : "text-charcoal hover:text-primary"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
            {/* Voice Control Button - Large Desktop Only */}
            <Button
              onClick={startListening}
              size="sm"
              className="hidden xl:flex bg-green-600 hover:bg-green-700 text-white font-semibold transition-all duration-300"
              title="Voice Commands: Say 'go home', 'show menu', 'nutrition info', etc."
            >
              <Mic className="mr-1 h-3 w-3" />
              <span className="text-xs">Voice</span>
            </Button>

            {/* AI Recommendations Button - Large Desktop Only */}
            <Button
              onClick={onAIRecommendationsClick}
              size="sm"
              className="hidden xl:flex bg-gradient-to-r from-primary to-accent hover:from-red-700 hover:to-orange-600 text-white font-semibold animate-pulse hover:animate-none transition-all duration-300"
            >
              <Zap className="mr-1 h-3 w-3" />
              <span className="text-xs">AI Picks</span>
            </Button>

            {/* Phone Button - Always Visible */}
            <a href="tel:01692584100">
              <Button size="sm" className="bg-accent-gold text-charcoal hover:bg-yellow-600 transition-colors font-semibold">
                <Phone className="h-3 w-3 sm:mr-1 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline text-xs sm:text-sm">01692 584 100</span>
              </Button>
            </a>
            
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`block py-3 text-lg font-medium transition-colors border-b border-gray-100 ${
                        isActive(item.href)
                          ? "text-primary"
                          : "text-charcoal hover:text-primary"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="mt-8 space-y-3">
                    {/* AI Recommendations for Mobile */}
                    <Button
                      onClick={() => {
                        try {
                          startListening();
                          setMobileMenuOpen(false);
                        } catch (error) {
                          // Voice control not available
                          console.error("Voice control not available", error);
                          setMobileMenuOpen(false);
                        }
                      }}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold"
                    >
                      <Mic className="mr-2 h-4 w-4" />
                      Voice Commands
                    </Button>

                    <Button
                      onClick={() => {
                        onAIRecommendationsClick?.();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full bg-gradient-to-r from-primary to-accent text-white hover:from-red-700 hover:to-orange-600"
                    >
                      <Zap className="mr-2 h-4 w-4" />
                      AI Recommendations
                    </Button>
                    
                    <a href="tel:01692584100">
                      <Button className="w-full bg-primary text-white hover:bg-red-700">
                        <Phone className="mr-2 h-4 w-4" />
                        Call Now
                      </Button>
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
