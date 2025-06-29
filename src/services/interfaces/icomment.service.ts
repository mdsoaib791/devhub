import { CommentDto } from "@/dtos/comment.dto";
import { CommentModel } from "@/models/comment.model";
export default interface ICommentService {
  getByBlogId(blogId: string): Promise<CommentDto>;
  add(model: CommentModel): Promise<CommentModel>;
  delete(id: string): Promise<CommentDto>;
}
