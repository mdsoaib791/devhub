import UserDto from './user.dto';

export default interface LoginDto {
  token?: string;
  tokenExpiryDate?: Date;
  refreshToken?: string;
  user?: UserDto;
}

export interface LoginHistoryDto {
  id: number;
  userId: string;
  token: string;
  ip: string;
  city?: string;
  region?: string;
  country?: string;
  browserName?: string;
  browserVersion?: string;
  fullBrowserVersion?: string;
  userAgent?: string;
  osName?: string;
  osVersion?: string;
  isDesktop?: boolean;
  isMobile?: boolean;
  expiryDate?: Date;
  createdAt: Date;
}
