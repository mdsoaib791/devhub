import { AxiosResponse } from 'axios';

import PlainDto from '@/dtos/plain.dto';
import Response from '@/dtos/response.dto';
import { ChangePasswordModel, ForgotPasswordModel, ResetPasswordModel } from '@/models/password.model';
import LoginModel from '@/models/login.model';
import { UserModel } from '@/models/user.model';
import LoginDto, { LoginHistoryDto } from '@/dtos/login.dto';
import UserDto from '@/dtos/user.dto';

export default interface IAccountService {
  login(model: LoginModel): Promise<AxiosResponse<Response<LoginDto>>>;
  logout(token: string): Promise<AxiosResponse<Response<PlainDto>>>;
  logoutAllSession(): Promise<AxiosResponse<Response<PlainDto>>>;
  getAllSession(): Promise<AxiosResponse<Response<LoginHistoryDto[]>>>;
  register(model: UserModel): Promise<AxiosResponse<Response<UserDto>>>;
  changePassword(model: ChangePasswordModel): Promise<AxiosResponse<Response<PlainDto>>>;
  forgotPassword(model: ForgotPasswordModel): Promise<AxiosResponse<Response<PlainDto>>>;
  resetPassword(model: ResetPasswordModel): Promise<AxiosResponse<Response<PlainDto>>>;
}
