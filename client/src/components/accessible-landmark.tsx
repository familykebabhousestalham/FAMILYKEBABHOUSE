import { ReactNode } from 'react';

interface AccessibleLandmarkProps {
  children: ReactNode;
  role?: 'main' | 'navigation' | 'banner' | 'contentinfo' | 'complementary' | 'search' | 'region';
  ariaLabel?: string;
  ariaLabelledBy?: string;
  id?: string;
  className?: string;
}

export default function AccessibleLandmark({
  children,
  role = 'region',
  ariaLabel,
  ariaLabelledBy,
  id,
  className = ''
}: Readonly<AccessibleLandmarkProps>) {
  let Tag: keyof JSX.IntrinsicElements;
  if (role === 'main') {
    Tag = 'main';
  } else if (role === 'navigation') {
    Tag = 'nav';
  } else if (role === 'banner') {
    Tag = 'header';
  } else if (role === 'contentinfo') {
    Tag = 'footer';
  } else {
    Tag = 'section';
  }

  return (
    <Tag
      role={role === 'main' || role === 'navigation' || role === 'banner' || role === 'contentinfo' ? undefined : role}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      id={id}
      className={className}
      tabIndex={role === 'main' ? 0 : undefined}
    >
      {children}
    </Tag>
  );
}
