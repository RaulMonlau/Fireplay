'use client';

import { ReactNode } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface ResponsiveLayoutProps {
  mobileContent: ReactNode;
  tabletContent?: ReactNode;
  desktopContent: ReactNode;
}

export default function ResponsiveLayout({
  mobileContent,
  tabletContent,
  desktopContent
}: ResponsiveLayoutProps) {
  const isMobile = useMediaQuery('(max-width: 639px)');
  const isTablet = useMediaQuery('(min-width: 640px) and (max-width: 1023px)');
  
  if (isMobile) return <>{mobileContent}</>;
  if (isTablet && tabletContent) return <>{tabletContent}</>;
  return <>{desktopContent}</>;
}