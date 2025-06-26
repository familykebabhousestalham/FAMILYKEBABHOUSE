import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, Zap, Brain, ChefHat } from "lucide-react";

interface AIRecommendationPopupProps {
  onClose: () => void;
  onGetRecommendations: () => void;
}

export default function AIRecommendationPopup({ onClose, onGetRecommendations }: Readonly<AIRecommendationPopupProps>) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show popup after 5 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleGetRecommendations = () => {
    onGetRecommendations();
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <Card className="max-w-md w-full bg-white shadow-2xl transform animate-in slide-in-from-bottom duration-500">
        <CardContent className="p-0">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-accent text-white p-6 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
              title="Close"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="text-center">
              <div className="text-4xl mb-3">🤖</div>
              <h3 className="font-poppins text-2xl font-bold mb-2">
                Can't Decide What to Order?
              </h3>
              <p className="text-orange-100">
                Let our AI help you find the perfect dish!
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <Brain className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-charcoal mb-1">Smart Recommendations</h4>
                  <p className="text-sm text-gray-600">Tell us your preferences and get personalized dish suggestions</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <ChefHat className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-charcoal mb-1">Perfect Matches</h4>
                  <p className="text-sm text-gray-600">Based on taste, portion size, spice level, and dietary needs</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Zap className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-charcoal mb-1">Quick & Easy</h4>
                  <p className="text-sm text-gray-600">Get recommendations in under 30 seconds</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleGetRecommendations}
                className="w-full bg-primary hover:bg-red-700 text-white font-bold py-3 transform hover:scale-105 transition-all duration-300"
                size="lg"
              >
                <Zap className="mr-2 h-5 w-5" />
                Get My Perfect Recommendations
              </Button>
              
              <Button
                onClick={onClose}
                variant="outline"
                className="w-full"
              >
                Maybe Later
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
