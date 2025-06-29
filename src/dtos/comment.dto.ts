export interface CommentDto {
  id?: string;
  blogId: string;
  author: string;
  userId: string;
  content: string;
  createdAt?: string;
}
