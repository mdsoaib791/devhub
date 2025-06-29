import { BlogDto } from "@/dtos/blog.dto";
import { BlogModel } from "@/models/blog.model";
export default interface IBlogService {
  getAll(): Promise<BlogDto[]>;
  getById(id: string): Promise<BlogDto>;
  add(model: BlogModel): Promise<BlogModel>;
  update(id: string, model: BlogModel): Promise<BlogModel>;
  delete(id: string): Promise<BlogDto>;
}
