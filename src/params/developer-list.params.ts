import { PaginationParams } from "./pagination.params";

export interface DeveloperListParams extends PaginationParams {
  skill?: string;
  search?: string;
}
