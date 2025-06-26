import { useState, useEffect, useRef } from 'react';
import type { SpeechRecognition, SpeechRecognitionEvent, SpeechRecognitionErrorEvent } from '../types/speech-recognition';

interface VoiceControlOptions {
  onNavigateToCategory?: (category: string) => void;
  onSelectItem?: (itemName: string) => void;
  onReadMenu?: () => void;
  onOrderItem?: () => void;
  onShowNutrition?: () => void;
}

export function useVoiceControl(options: VoiceControlOptions = {}) {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognition = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    // Check if speech recognition is supported
    const SpeechRecognition = (window as any).SpeechRecognition ?? (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      setIsSupported(true);
      recognition.current = new SpeechRecognition();
      
      if (recognition.current) {
        recognition.current.continuous = false;
        recognition.current.interimResults = false;
        recognition.current.lang = 'en-US';

        recognition.current.onresult = (event: SpeechRecognitionEvent) => {
          const lastResult = event.results[event.results.length - 1];
          const transcript = lastResult[0].transcript.toLowerCase().trim();
          setTranscript(transcript);
          processVoiceCommand(transcript);
        };

        recognition.current.onend = () => {
          setIsListening(false);
        };

        recognition.current.onerror = (event: SpeechRecognitionErrorEvent) => {
          // Handle speech recognition errors gracefully
          setIsListening(false);
        };
      }
    }

    return () => {
      if (recognition.current) {
        recognition.current.abort();
      }
    };
  }, []);

  const processVoiceCommand = (command: string) => {
    // Navigation commands
    if (command.includes('show') || command.includes('go to') || command.includes('navigate')) {
      if (command.includes('kebab') || command.includes('kebabs')) {
        options.onNavigateToCategory?.('kebabs');
        speak('Showing kebabs menu');
      } else if (command.includes('pizza') || command.includes('pizzas')) {
        options.onNavigateToCategory?.('pizzas');
        speak('Showing pizzas menu');
      } else if (command.includes('burger') || command.includes('burgers')) {
        options.onNavigateToCategory?.('burgers');
        speak('Showing burgers menu');
      } else if (command.includes('chicken')) {
        options.onNavigateToCategory?.('fried-chicken');
        speak('Showing chicken menu');
      } else if (command.includes('drink') || command.includes('drinks')) {
        options.onNavigateToCategory?.('drinks');
        speak('Showing drinks menu');
      } else if (command.includes('lunch') || command.includes('offer')) {
        options.onNavigateToCategory?.('lunch-time-offers');
        speak('Showing lunch time offers');
      }
    }

    // Menu reading commands
    if (command.includes('read menu') || command.includes('read the menu')) {
      options.onReadMenu?.();
      speak('Reading the menu for you');
    }

    // Order commands
    if (command.includes('order') || command.includes('call')) {
      options.onOrderItem?.();
      speak('Opening phone to place your order');
    }

    // Nutrition commands
    if (command.includes('nutrition') || command.includes('calories') || command.includes('allergen')) {
      options.onShowNutrition?.();
      speak('Showing nutritional information');
    }

    // Help command
    if (command.includes('help') || command.includes('what can you do')) {
      speak('You can say: Show kebabs, Show pizzas, Show burgers, Read menu, Order now, or Show nutrition information');
    }
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const startListening = () => {
    if (recognition.current && !isListening) {
      setIsListening(true);
      recognition.current.start();
    }
  };

  const stopListening = () => {
    if (recognition.current && isListening) {
      recognition.current.stop();
      setIsListening(false);
    }
  };

  return {
    isListening,
    isSupported,
    transcript,
    startListening,
    stopListening,
    speak
  };
}

