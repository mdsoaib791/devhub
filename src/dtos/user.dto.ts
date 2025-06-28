
export default interface UserDto {
  id: number;
  email: string;
  password: string;
  name: string;
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
