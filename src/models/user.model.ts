export interface UserModel {
  fullName: string;
  email: string;
  userName?: string;
  phoneNumber?: string;
  password: string;
  confirmPassword: string;
  roleName?: string;
  recaptchaToken: string;
}

export interface UserUpdateModel {
  fullName: string;
  email: string;
  phoneNumber: string;
  profilePicture: FileList | undefined;
  profilePictureHidden?: string;
}

export interface ProfilePictureModel {
  profilePicture: FileList;
  profilePictureHidden?: string;
}
