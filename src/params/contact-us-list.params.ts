import { PaginationParams } from "./pagination.params";


export interface ContactUsListParams extends PaginationParams {
  startDate?: string | null;
  endDate?: string | null;
}
