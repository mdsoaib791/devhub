import { injectable } from 'inversify';
import { AxiosResponse } from 'axios';

import { iocContainer } from '@/ioc/container.ioc';
import { IOCTYPES } from '@/ioc/types.ioc';

import IAccountService from './interfaces/iaccount.service';
import IHttpService from './interfaces/ihttp.service';
import LoginModel from '@/models/login.model';
import Response from '@/dtos/response.dto';

import { UserModel } from '@/models/user.model';
import { ChangePasswordModel, ForgotPasswordModel, ResetPasswordModel } from '@/models/password.model';

import LoginDto, { LoginHistoryDto } from '@/dtos/login.dto';
import PlainDto from '@/dtos/plain.dto';
import UserDto from '@/dtos/user.dto';

@injectable()
export default class AccountService implements IAccountService {
  private readonly httpService: IHttpService;

  constructor(httpService = iocContainer.get<IHttpService>(IOCTYPES.IHttpService)) {
    this.httpService = httpService;
  }

  login(model: LoginModel): Promise<AxiosResponse<Response<LoginDto>>> {
    const result = this.httpService.call().post<LoginDto, AxiosResponse<Response<LoginDto>>>('/Account/Login', model);

    return result;
  }

  logout(token: string): Promise<AxiosResponse<Response<PlainDto>>> {
    const result = this.httpService.call().post<PlainDto, AxiosResponse<Response<PlainDto>>>('/Account/logout', {
      token: token,
    });

    return result;
  }

  logoutAllSession(): Promise<AxiosResponse<Response<PlainDto>>> {
    const result = this.httpService.call().post<PlainDto, AxiosResponse<Response<PlainDto>>>('/Account/logoutallsession');

    return result;
  }

  getAllSession(): Promise<AxiosResponse<Response<LoginHistoryDto[]>>> {
    const result = this.httpService.call().get<LoginHistoryDto[], AxiosResponse<Response<LoginHistoryDto[]>>>('/Account/getallsession');

    return result;
  }

  register(model: UserModel): Promise<AxiosResponse<Response<UserDto>>> {

    const result = this.httpService.call().post<UserDto, AxiosResponse<Response<UserDto>>>('/Account/Create', model);

    return result;
  }

  changePassword(model: ChangePasswordModel): Promise<AxiosResponse<Response<PlainDto>>> {
    return this.httpService.call().post<PlainDto, AxiosResponse<Response<PlainDto>>>('/Account/ChangePassword', model);
  }

  forgotPassword(model: ForgotPasswordModel): Promise<AxiosResponse<Response<PlainDto>>> {
    const result = this.httpService.call().post<PlainDto, AxiosResponse<Response<PlainDto>>>('/Account/forgotpassword', model);

    return result;
  }

  resetPassword(model: ResetPasswordModel): Promise<AxiosResponse<Response<PlainDto>>> {
    return this.httpService.call().post<PlainDto, AxiosResponse<Response<PlainDto>>>('/Account/resetpassword', model);
  }
}
