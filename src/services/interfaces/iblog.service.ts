import { BlogDto } from "@/dtos/blog.dto";
import Response from "@/dtos/response.dto";
import { BlogModel } from "@/models/blog.model";
import { AxiosResponse } from "axios";

export default interface IBlogService {
  getAll(): Promise<AxiosResponse<Response<BlogDto[]>>>;
  getById(id: string): Promise<AxiosResponse<Response<BlogDto>>>;
  add(model: BlogModel): Promise<AxiosResponse<Response<BlogDto>>>;
  update(id: string, model: BlogModel): Promise<AxiosResponse<Response<BlogDto>>>;
  // delete(id: string): Promise<AxiosResponse<Response<null>>>;
}
