import { useState, useEffect, useCallback } from 'react';

interface KeyboardNavigationOptions {
  onNavigateUp?: () => void;
  onNavigateDown?: () => void;
  onNavigateLeft?: () => void;
  onNavigateRight?: () => void;
  onSelect?: () => void;
  onEscape?: () => void;
  onHome?: () => void;
  onEnd?: () => void;
  disabled?: boolean;
}

export function useKeyboardNavigation(options: KeyboardNavigationOptions = {}) {
  const [currentFocus, setCurrentFocus] = useState(-1);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (options.disabled) return;

    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        options.onNavigateUp?.();
        break;
      case 'ArrowDown':
        event.preventDefault();
        options.onNavigateDown?.();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        options.onNavigateLeft?.();
        break;
      case 'ArrowRight':
        event.preventDefault();
        options.onNavigateRight?.();
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        options.onSelect?.();
        break;
      case 'Escape':
        event.preventDefault();
        options.onEscape?.();
        break;
      case 'Home':
        event.preventDefault();
        options.onHome?.();
        break;
      case 'End':
        event.preventDefault();
        options.onEnd?.();
        break;
    }
  }, [options]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return {
    currentFocus,
    setCurrentFocus
  };
}