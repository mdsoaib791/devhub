export interface ChangePasswordModel {
  userId: string;
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface UpdatePasswordModel {
  userId: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface ForgotPasswordModel {
  username: string;
}

export interface ResetPasswordModel {
  userId: string;
  token: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface PasswordResetLinkModel {
  userId: string;
  token: string;
}
