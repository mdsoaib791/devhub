'use client';

import config from '@/config';
import Image, { ImageProps } from 'next/image';
import { useEffect, useState } from 'react';

type LogoProps = Omit<ImageProps, 'src' | 'alt'> & {
  variant?: 'white' | 'normal';
};

export default function JobBoardLogo({ variant = 'normal', width = 110, height = 0, className = 'm-0 h-auto', ...props }: LogoProps) {
  const [logoPath, setLogoPath] = useState<string>(`${config.cdnUrl}/images/logo.svg`);

  useEffect(() => {
    if (variant === 'normal') {
      setLogoPath(`${config.cdnUrl}/images/job-board-logo.webp`);
    } else if (variant === 'white') {
      setLogoPath(`${config.cdnUrl}/images/job-board-logo-white.webp`);
    }
  }, [variant]);

  return <Image {...props} src={logoPath} alt={`${config.appName}`} width={width} height={height} className={className} priority />;
}
