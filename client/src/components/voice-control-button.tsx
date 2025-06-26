import { Mic, MicOff, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useVoiceControl } from '@/hooks/use-voice-control';

interface VoiceControlButtonProps {
  readonly onNavigateToCategory?: (category: string) => void;
  readonly onSelectItem?: (itemName: string) => void;
  readonly onReadMenu?: () => void;
  readonly onOrderItem?: () => void;
  readonly onShowNutrition?: () => void;
}

export default function VoiceControlButton({
  onNavigateToCategory,
  onSelectItem,
  onReadMenu,
  onOrderItem,
  onShowNutrition
}: Readonly<VoiceControlButtonProps>) {
  const {
    isListening,
    isSupported,
    transcript,
    startListening,
    stopListening,
    speak
  } = useVoiceControl({
    onNavigateToCategory,
    onSelectItem,
    onReadMenu,
    onOrderItem,
    onShowNutrition
  });

  if (!isSupported) {
    return null;
  }

  const handleVoiceHelp = () => {
    speak('Voice commands available: Say Show kebabs, Show pizzas, Show burgers, Show chicken, Show drinks, Show lunch offers, Read menu, Order now, or Show nutrition information');
  };

  return (
    <div className="fixed bottom-20 right-4 z-50 flex flex-col items-end space-y-2">
      {/* Voice Commands Help */}
      <Button
        onClick={handleVoiceHelp}
        variant="outline"
        size="sm"
        className="bg-white/90 backdrop-blur-sm border-primary/20 hover:bg-primary/10"
        aria-label="Voice commands help"
      >
        <Volume2 className="h-4 w-4 mr-2" />
        Voice Help
      </Button>

      {/* Transcript Display */}
      {transcript && (
        <Badge 
          variant="secondary" 
          className="max-w-48 text-xs bg-white/90 backdrop-blur-sm"
        >
          "{transcript}"
        </Badge>
      )}

      {/* Main Voice Control Button */}
      <Button
        onClick={isListening ? stopListening : startListening}
        className={`w-16 h-16 rounded-full shadow-lg transition-all duration-300 ${
          isListening 
            ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
            : 'bg-primary hover:bg-red-700'
        }`}
        aria-label={isListening ? 'Stop voice control' : 'Start voice control'}
        aria-pressed={isListening}
      >
        {isListening ? (
          <MicOff className="h-6 w-6 text-white" />
        ) : (
          <Mic className="h-6 w-6 text-white" />
        )}
      </Button>

      {/* Status Indicator */}
      <div className="text-xs text-center">
        <Badge 
          variant={isListening ? "destructive" : "secondary"}
          className="bg-white/90 backdrop-blur-sm"
        >
          {isListening ? 'Listening...' : 'Voice Control'}
        </Badge>
      </div>
    </div>
  );
}
