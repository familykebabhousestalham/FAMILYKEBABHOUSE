import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Zap, X } from "lucide-react";

interface FloatingAIButtonProps {
  readonly onClick: () => void;
}

export default function FloatingAIButton({ onClick }: FloatingAIButtonProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isDismissed) {
        setIsVisible(true);
      }
    }, 8000); // Show after 8 seconds

    return () => clearTimeout(timer);
  }, [isDismissed]);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking && !isDismissed) {
        requestAnimationFrame(() => {
          if (window.scrollY > 300) {
            setIsVisible(true);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDismissed(true);
    setIsVisible(false);
  };

  if (!isVisible || isDismissed) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 animate-in slide-in-from-right duration-500">
      <div className="relative">
        {/* Pulse animation background */}
        <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-20"></div>
        
        {/* Main button */}
        <Button
          onClick={onClick}
          className="relative bg-gradient-to-r from-primary to-accent hover:from-red-700 hover:to-orange-600 text-white font-bold px-6 py-4 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300 group"
          size="lg"
        >
          <div className="flex items-center gap-3">
            <Zap className="h-6 w-6 group-hover:animate-bounce" />
            <div className="hidden sm:block">
              <div className="text-sm font-bold">AI Recommendations</div>
              <div className="text-xs text-orange-100">Find your perfect dish!</div>
            </div>
            <div className="text-2xl">🤖</div>
          </div>
        </Button>

        {/* Dismiss button */}
        <button
          onClick={handleDismiss}
          className="absolute -top-2 -right-2 bg-white text-gray-600 hover:text-gray-800 rounded-full p-1 shadow-lg transition-colors"
          title="Dismiss AI Recommendations"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Tooltip for mobile */}
        <div className="sm:hidden absolute bottom-full right-0 mb-2 bg-black text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          AI Food Recommendations
        </div>
      </div>
    </div>
  );
}
