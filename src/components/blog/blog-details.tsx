'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CommentDto } from "@/dtos/comment.dto";
import { useGetBlogById } from "@/hooks/services-hook/use-blog.service.hook";
import { useAddComment, useGetCommentsByBlogId } from "@/hooks/services-hook/use-comment.service.hook";
import { useToast } from "@/hooks/use-toast";
import type { CommentModel } from "@/models/comment.model";
import { yupResolver } from "@hookform/resolvers/yup";
import { Loader2 } from "lucide-react";
import moment from "moment";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

type Props = {
  blogId: string;
};

// Yup validation schema as per CommentModel
const commentSchema = yup.object().shape({
  content: yup.string().required("Comment cannot be empty"),
});

export default function BlogDetails({ blogId }: Props) {
  const { data: blog, isLoading, error } = useGetBlogById(blogId);
  const { data: comments = [], isLoading: commentsLoading } = useGetCommentsByBlogId(blogId);
  const addComment = useAddComment();
  const { toast } = useToast();
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<{ content: string }>({
    resolver: yupResolver(commentSchema),
    defaultValues: { content: "" },
  });

  const handleAddComment = (values: { content: string }) => {
    if (!session?.user) {
      toast({
        title: "You must be logged in to comment.",
        variant: "destructive",
      });
      return;
    }
    setIsSubmitting(true);
    addComment.mutate(
      {
        blogId,
        userId: session.user.id,
        author: session.user.name || "Anonymous",
        content: values.content,
        createdAt: new Date().toISOString(),
      } as CommentModel,
      {
        onSuccess: () => {
          form.reset();
          setIsSubmitting(false);
          toast({
            title: "Comment added!",
            variant: "success",
          });
        },
        onError: () => {
          setIsSubmitting(false);
          toast({
            title: "Failed to add comment.",
            variant: "destructive",
          });
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <h2 className="font-semibold text-destructive">Blog not found</h2>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto my-8 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{blog.title}</CardTitle>
        <div className="text-sm text-muted-foreground mt-2">
          {blog.createdAt && moment(blog.createdAt).format("MMM D, YYYY")}
        </div>
      </CardHeader>
      <CardContent>
        <div className="prose dark:prose-invert max-w-none mb-8">
          {blog.content}
        </div>

        {/* Comments Section */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">Comments</h3>
          {commentsLoading ? (
            <div className="text-muted-foreground mb-4">Loading comments...</div>
          ) : comments.length === 0 ? (
            <div className="text-muted-foreground mb-4">No comments yet. Be the first to comment!</div>
          ) : (
            <div className="space-y-4 mb-4">
              {comments.map((commentData: CommentDto) => (
                <div key={commentData.id} className="border rounded p-3 bg-muted/30">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">{commentData.author}</span>
                    <span className="text-xs text-muted-foreground">
                      {moment(commentData.createdAt).fromNow()}
                    </span>
                  </div>
                  <div className="text-sm">{commentData.content}</div>
                </div>
              ))}
            </div>
          )}

          {session?.user ? (
            <form onSubmit={form.handleSubmit(handleAddComment)} className="space-y-2">
              <Input
                placeholder="Your name"
                value={session.user.name || ""}
                disabled
              />
              <Textarea
                placeholder="Add a comment..."
                {...form.register("content")}
                disabled={isSubmitting}
              />
              {form.formState.errors.content && (
                <div className="text-destructive text-sm">
                  {form.formState.errors.content.message}
                </div>
              )}
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Posting..." : "Post Comment"}
              </Button>
            </form>
          ) : (
            <div className="text-muted-foreground italic mt-2">
              Please log in to add a comment.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
