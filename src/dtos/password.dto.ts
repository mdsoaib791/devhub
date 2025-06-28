export interface PasswordResetLinkDto {
  id: number;
  userId: string;
  uniqueValue: string;
  actionType: string;
  isExpired: boolean;
  createdAt: Date;
}
