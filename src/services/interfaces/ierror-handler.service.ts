import Response from '@/dtos/response.dto';
import { AxiosResponse } from 'axios';

export default interface IErrorHandlerService {
  getErrorMessage<T>(error: AxiosResponse<Response<T>>): string;
}
