import { DeveloperDto } from "@/dtos/developer.dto";
import { DeveloperModel } from "@/models/developer.model";

export default interface IDeveloperService {
  getAll(): Promise<DeveloperDto[]>;
  getById(id: string): Promise<DeveloperDto>;
  add(model: DeveloperModel): Promise<DeveloperDto>;
  update(id: string, model: DeveloperModel): Promise<DeveloperDto>;
  delete(id: string): Promise<DeveloperDto>;
}
