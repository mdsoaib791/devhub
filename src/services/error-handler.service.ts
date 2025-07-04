import config from '@/config';

import PlainDto from '@/dtos/plain.dto';
import Response from '@/dtos/response.dto';
import axios, { AxiosResponse } from 'axios';
import { injectable } from 'inversify';
import IErrorHandlerService from './interfaces/ierror-handler.service';

@injectable()
export default class ErrorHandlerService implements IErrorHandlerService {
  constructor() { }

  getErrorMessage<T>(error: AxiosResponse<Response<T>>): string {
    try {
      if (axios.isAxiosError(error)) {
        const actualError: Response<T> | undefined = error.response?.data;

        if (actualError) {
          if (actualError.errors) return actualError.errors.join('<br/>');
          else if (actualError.data) {
            return String(actualError.data);
          } else {
            if (config.enviroment === 'production') {
              return 'Some error occured';
            } else {
              return JSON.stringify(actualError);
            }
          }
        }
      } else {
        if (error?.data?.errors) {
          const actualError: Response<T> = error?.data;

          if (actualError) {
            if (actualError.errors) return actualError.errors.join('<br/>');
            else if (actualError.data) {
              return String(actualError.data);
            } else {
              if (config.enviroment === 'production') {
                return 'Some error occured';
              } else {
                return JSON.stringify(actualError);
              }
            }
          } else {
            const castedError = error.data as Response<PlainDto>;
            if (castedError.data) return castedError.errors.join('<br/>');
            else if (castedError.message) return castedError.message;
          }
        } else {
          if (typeof error.data === 'string') {
            return error.data;
          }

          const castedError = error.data as Response<PlainDto>;

          if (castedError.data) return castedError.errors.join('<br/>');
          else if (castedError.message) return castedError.message;
        }
      }
      return 'Some error occured';
    } catch {
      return 'Some error occured.';
    }
  }
}
