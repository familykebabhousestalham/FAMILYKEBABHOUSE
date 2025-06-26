// client/src/hooks/use-global-voice-control.tsx
import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import type {
  SpeechRecognitionEvent,
  SpeechRecognitionErrorEvent
} from '../types/speech-recognition';

interface VoiceControlCommands {
  [key: string]: () => void;
}

// Helper: map transcript → menu item aria-label suffix
function getMenuClickLabel(normalized: string): string | null {
  if (normalized.includes('burger'))      return 'burgers';
  if (normalized.includes('pizza'))       return 'pizzas';
  if (normalized.includes('kebab'))       return 'kebabs';
  if (normalized.includes('chicken'))     return 'fried-chicken';
  return null;
}

export function useGlobalVoiceControl() {
  const navigate = useNavigate();

  // Stable commands object
  const commands = useMemo<VoiceControlCommands>(() => ({
    'go home':           () => { navigate('/'); },
    'show menu':         () => { navigate('/menu'); },
    'nutrition info':    () => { navigate('/nutritional-info'); },
    'nutritional information': () => { navigate('/nutritional-info'); },
    'about us':          () => { navigate('/about'); },
    'contact us':        () => { navigate('/contact'); },
    'call restaurant':   () => { window.open('tel:01692584100', '_self'); },
    'phone number':      () => { window.open('tel:01692584100', '_self'); },
    'scroll up':         () => { window.scrollTo({ top: 0, behavior: 'smooth' }); },
    'scroll down':       () => { window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }); },
    'go back':           () => { window.history.back(); },
    'refresh page':      () => { window.location.reload(); },
  }), [navigate]);

  // 1) Try exact or partial match against commands
  const executeCommand = useCallback((normalized: string): boolean => {
    if (commands[normalized]) {
      commands[normalized]();
      return true;
    }
    for (const [cmd, action] of Object.entries(commands)) {
      if (normalized.includes(cmd)) {
        action();
        return true;
      }
    }
    return false;
  }, [commands]);

  // 2) Handle “show/find” menu shortcuts
  const handleMenuLookup = useCallback((normalized: string): boolean => {
    if (!/\b(show|find)\b/.test(normalized)) return false;
    const label = getMenuClickLabel(normalized);
    if (!label) return false;

    // Navigate then click the right category button
    navigate('/menu');
    setTimeout(() => {
      const btn = document.querySelector(`[aria-label*="${label}"]`) as HTMLElement;
      btn?.click();
    }, 500);

    return true;
  }, [navigate]);

  // Main processor now very flat
  const processVoiceCommand = useCallback((transcript: string): boolean => {
    const normalized = transcript.toLowerCase().trim();

    if (executeCommand(normalized))      return true;
    if (handleMenuLookup(normalized))    return true;
    return false;
  }, [executeCommand, handleMenuLookup]);

  // Starts Web Speech API recognition
  const startListening = useCallback(() => {
    const SpeechRecognition =
      (window as any).webkitSpeechRecognition ?? (window as any).SpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous       = false;
    recognition.interimResults   = false;
    recognition.lang             = 'en-US';

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      const executed  = processVoiceCommand(transcript);

      // provide user feedback
      if ('speechSynthesis' in window) {
        const msg = executed
          ? 'Command executed'
          : 'Command not recognized. Try saying go home, show menu, or nutrition info';

        const u = new SpeechSynthesisUtterance(msg);
        u.rate   = 0.8;
        u.volume = 0.7;
        window.speechSynthesis.speak(u);
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      if (!['aborted', 'no-speech', 'network'].includes(event.error)) {
        console.error('Speech recognition error:', event.error);
      }
    };

    recognition.start();
  }, [processVoiceCommand]);

  return { startListening, processVoiceCommand };
}
