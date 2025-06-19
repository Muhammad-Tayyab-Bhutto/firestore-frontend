import React from 'react';
import { GraduationCap } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Logo({ size = 'md', className }: LogoProps) {
  const textSizeClass = size === 'sm' ? 'text-xl' : size === 'md' ? 'text-2xl' : 'text-3xl';
  const iconSizeClass = size === 'sm' ? 'h-5 w-5' : size === 'md' ? 'h-6 w-6' : 'h-7 w-7';

  return (
    <div className={`flex items-center gap-2 text-primary ${className || ''}`}>
      <GraduationCap className={iconSizeClass} />
      <span className={`font-headline font-bold ${textSizeClass}`}>AdmitPro</span>
    </div>
  );
}
