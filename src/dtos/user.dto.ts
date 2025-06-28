import RoleDto from './role.dto';

export default interface UserDto {
  id: string;
  userName: string;
  normalizedUserName: string;
  email: string;
  normalizedEmail: string;
  emailConfirmed: boolean;
  fullName: string;
  companyName: string | null;
  profilePicture: string | null;
  isActive: boolean;
  phoneNumber: string | null;
  phoneNumberConfirmed: boolean;
  twoFactorEnabled: boolean;
  registerDate: string | null;
  lockoutEnd: string | null;
  lockoutEnabled: boolean;
  accessFailedCount: number;
  roleName: string;
  role: RoleDto;
  roles: RoleDto[] | null;
  timezoneId: string | null;
  token: string | null;
}

export interface UserBasicDto {
  id: string;
  fullName: string;
  userName: string;
  email: string | null;
  isActive: boolean;
  profilePicture: string | null;
}

export interface UserStatusDto {
  isActive: boolean;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
}
