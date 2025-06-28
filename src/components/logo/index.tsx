'use client';

import config from '@/config';
import Image, { ImageProps } from 'next/image';
import { useEffect, useState } from 'react';

type LogoProps = Omit<ImageProps, 'src' | 'alt'> & {
  logoType?: 'logo' | 'icon';
};

export default function Logo({ logoType = 'logo', width = 110, height = 0, className = 'm-0 h-auto', ...props }: LogoProps) {
  const [logoPath, setLogoPath] = useState<string>(`${config.cdnUrl}/images/logo.svg`);

  useEffect(() => {
    if (logoType === 'logo') {
      setLogoPath(`${config.cdnUrl}/images/logo.svg`);
    } else if (logoType === 'icon') {
      setLogoPath(`${config.cdnUrl}/images/logo-icon.svg`);
    }
  }, [logoType]);

  return <Image {...props} src={logoPath} alt={`${config.appName}`} width={width} height={height} className={className} priority />;
}
