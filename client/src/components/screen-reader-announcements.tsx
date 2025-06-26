// client/src/components/screen-reader-announcements.tsx
import { useEffect, useRef } from 'react';

interface ScreenReaderAnnouncementsProps {
  readonly announcement: string;
  readonly priority?: 'polite' | 'assertive';
}

export default function ScreenReaderAnnouncements({
  announcement,
  priority = 'polite',
}: ScreenReaderAnnouncementsProps) {
  const announcementRef = useRef<HTMLOutputElement>(null);

  useEffect(() => {
    if (announcement && announcementRef.current) {
      announcementRef.current.textContent = '';
      setTimeout(() => {
        if (announcementRef.current) {
          announcementRef.current.textContent = announcement;
        }
      }, 100);
    }
  }, [announcement]);

  return (
    <output
      ref={announcementRef}
      // spread in one of two literal values so the JSX source is always plain strings
      {...(priority === 'assertive'
        ? { 'aria-live': 'assertive' }
        : { 'aria-live': 'polite' })}
      aria-atomic="true"
      className="sr-only"
    />
  );
}

// Hook for managing screen reader announcements
export function useScreenReaderAnnouncements() {
  const announce = (
    message: string,
    priority: 'polite' | 'assertive' = 'polite'
  ) => {
    // Create a temporary element with literal attributes
    const el = document.createElement('div');
    el.setAttribute('aria-live', priority);
    el.setAttribute('aria-atomic', 'true');
    el.className = 'sr-only';
    el.textContent = message;

    document.body.appendChild(el);
    setTimeout(() => document.body.removeChild(el), 1000);
  };

  return { announce };
}
