import { CommentModel } from "@/models/comment.model";
import CommentService from "@/services/comment.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const commentService = new CommentService();

export const useGetCommentsByBlogId = (blogId: string) =>
  useQuery({ queryKey: ["comments", blogId], queryFn: () => commentService.getByBlogId(blogId), enabled: !!blogId });

export const useAddComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (model: CommentModel) => commentService.add(model),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["comments", variables.blogId] });
    },
  });
};
