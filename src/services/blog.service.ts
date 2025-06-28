import { BlogDto } from "@/dtos/blog.dto";
import Response from "@/dtos/response.dto";
import { iocContainer } from "@/ioc/container.ioc";
import { IOCTYPES } from "@/ioc/types.ioc";
import { BlogModel } from "@/models/blog.model";
import { AxiosResponse } from "axios";
import { injectable } from "inversify";
import IBlogService from "./interfaces/iblog.service";
import IHttpService from "./interfaces/ihttp.service";

@injectable()
export default class BlogService implements IBlogService {
  private readonly httpService: IHttpService;

  constructor(httpService = iocContainer.get<IHttpService>(IOCTYPES.IHttpService)) {
    this.httpService = httpService;
  }

  getAll(): Promise<AxiosResponse<Response<BlogDto[]>>> {
    return this.httpService.call().get<BlogDto[], AxiosResponse<Response<BlogDto[]>>>(`/blogs`);
  }

  getById(id: string): Promise<AxiosResponse<Response<BlogDto>>> {
    return this.httpService.call().get<BlogDto, AxiosResponse<Response<BlogDto>>>(`/blogs/${id}`);
  }

  add(model: BlogModel): Promise<AxiosResponse<Response<BlogDto>>> {
    return this.httpService.call().post<BlogDto, AxiosResponse<Response<BlogDto>>>(`/blogs`, model);
  }

  update(id: string, model: BlogModel): Promise<AxiosResponse<Response<BlogDto>>> {
    return this.httpService.call().put<BlogDto, AxiosResponse<Response<BlogDto>>>(`/blogs/${id}`, model);
  }

  // delete(id: string): Promise<AxiosResponse<Response<null>>> {
  //   return this.httpService.call().delete<null, AxiosResponse<Response<null>>>(`/blogs/${id}`);
  // }
}
