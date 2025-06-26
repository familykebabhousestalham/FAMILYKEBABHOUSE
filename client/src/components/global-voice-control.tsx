import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff } from 'lucide-react';
import { useGlobalVoiceControl } from '@/hooks/use-global-voice-control';

export default function GlobalVoiceControl() {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const { startListening } = useGlobalVoiceControl();

  useEffect(() => {
    setIsSupported('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);
  }, []);

  const handleVoiceCommand = () => {
    if (!isSupported) {
      alert('Voice control is not supported in this browser. Please use Chrome, Safari, or Edge.');
      return;
    }

    setIsListening(true);
    startListening();
    
    // Reset listening state after a few seconds
    setTimeout(() => {
      setIsListening(false);
    }, 3000);
  };

  if (!isSupported) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={handleVoiceCommand}
        className={`w-14 h-14 rounded-full shadow-lg transition-all duration-300 ${
          isListening 
            ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
            : 'bg-primary hover:bg-red-700'
        }`}
        disabled={isListening}
        aria-label={isListening ? 'Listening for voice command' : 'Start voice command'}
        title={isListening ? 'Listening...' : 'Voice Commands (Say: go home, show menu, nutrition info, etc.)'}
      >
        {isListening ? (
          <Mic className="h-6 w-6 text-white" />
        ) : (
          <MicOff className="h-6 w-6 text-white" />
        )}
      </Button>
      
      {isListening && (
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black text-white px-3 py-1 rounded-full text-xs whitespace-nowrap">
          🎤 Listening...
        </div>
      )}
    </div>
  );
}