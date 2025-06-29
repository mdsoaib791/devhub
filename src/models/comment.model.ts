export interface CommentModel {
  id?: string;
  blogId: string;
  userId: string;
  author: string;
  content: string;
  createdAt?: string;
}
