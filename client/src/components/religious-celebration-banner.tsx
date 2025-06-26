import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { getCurrentCelebration, defaultWelcomeMessage } from '../data/religious-celebrations';

export const ReligiousCelebrationBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentCelebration, setCurrentCelebration] = useState(getCurrentCelebration());

  useEffect(() => {
    // Check for celebrations every hour in case date changes
    const interval = setInterval(() => {
      setCurrentCelebration(getCurrentCelebration());
    }, 3600000); // 1 hour

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  // Use actual celebration based on current date
  const celebration = currentCelebration;
  const message = celebration ? celebration.message : defaultWelcomeMessage.message;
  const color = celebration ? celebration.color : defaultWelcomeMessage.color;
  const emoji = celebration ? celebration.emoji : defaultWelcomeMessage.emoji;

  return (
    <div className={`relative ${color} text-white py-3 px-4 shadow-lg`}>
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-1">
          <img
            className="text-2xl animate-pulse celebration-emoji-img"
            src={`data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><text y='32' font-size='32'>${encodeURIComponent(
              emoji
            )}</text></svg>`}
            alt="celebration emoji"
            width={32}
            height={32}
          />
          <p className="text-sm md:text-base font-medium leading-relaxed">
            {message}
          </p>
        </div>
        
        <button
          onClick={() => setIsVisible(false)}
          className="ml-4 p-1 rounded-full hover:bg-white/20 transition-colors duration-200 flex-shrink-0"
          aria-label="Close banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      
      {/* Decorative sparkles for celebrations */}
      {celebration && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1 left-10 w-1 h-1 bg-white rounded-full animate-ping opacity-70"></div>
          <div className="absolute top-3 right-20 w-1 h-1 bg-white rounded-full animate-ping opacity-50 ping-delay-500"></div>
          <div className="absolute bottom-2 left-1/3 w-1 h-1 bg-white rounded-full animate-ping opacity-60 ping-delay-1000"></div>
          <div className="absolute bottom-1 right-10 w-1 h-1 bg-white rounded-full animate-ping opacity-40 ping-delay-1500"></div>
        </div>
      )}
    </div>
  );
};

export default ReligiousCelebrationBanner;

