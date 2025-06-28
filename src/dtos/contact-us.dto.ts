export interface ContactUsDto {
  id: number;
  fullName: string | null;
  email: string | null;
  phone: string | null;
  companyName: string | null;
  message: string | null;
  ipAddress: string | null;
  isRead: boolean | null;
  createdOn: Date;
  updatedOn: Date | null;
}
