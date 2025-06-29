"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useDeleteBlog, useGetAllBlogs } from "@/hooks/services-hook/use-blog.service.hook";
import type { BlogModel } from "@/models/blog.model";
import { Calendar, Loader2, MessageCircle, Trash, User } from "lucide-react";
import moment from "moment";
import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";
import { FaEdit } from "react-icons/fa";
import ConfirmationDialog from "../common/confirmation-dialog";
import AddEditBlog from "./add-edit-blog";

interface BlogListProps {
  userId?: string;
}

const ITEMS_PER_PAGE = 4;

export default function BlogList({ userId }: BlogListProps) {
  const { data: session } = useSession();
  const { data: blogs, isLoading } = useGetAllBlogs();
  const [page, setPage] = useState(1);
  const [editBlog, setEditBlog] = useState<BlogModel | null>(null);
  const [deleteBlog, setDeleteBlog] = useState<BlogModel | null>(null);
  const deleteBlogMutation = useDeleteBlog();

  // Filter blogs by userId if provided
  const filteredBlogs = useMemo(() => {
    if (!blogs) return [];
    return userId ? blogs.filter((b: BlogModel) => b.userId === userId) : blogs;
  }, [blogs, userId]);

  // Pagination logic
  const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE);
  const paginatedBlogs = filteredBlogs.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Dialog open={!!editBlog} onOpenChange={open => !open && setEditBlog(null)}>
        <DialogContent className="max-w-lg w-full">
          <DialogHeader>
            <DialogTitle>Edit Blog</DialogTitle>
          </DialogHeader>
          {editBlog && (
            <AddEditBlog
              userId={userId!}
              blog={editBlog || undefined}
              open={!!editBlog}
              onOpenChange={open => !open && setEditBlog(null)}
              onSuccess={() => setEditBlog(null)}
              onCancel={() => setEditBlog(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        open={!!deleteBlog}
        onOpenChangeAction={open => !open && setDeleteBlog(null)}
        onConfirmAction={() => {
          if (deleteBlog?.id) {
            deleteBlogMutation.mutate(deleteBlog.id, {
              onSuccess: () => setDeleteBlog(null),
            });
          }
        }}
        onCancel={() => setDeleteBlog(null)}
        title="Delete Blog"
        description="Are you sure you want to delete this blog post? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        loading={deleteBlogMutation.status === "pending"}
      />

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {paginatedBlogs.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <div className="flex flex-col items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold">No blog posts found</h3>
                    <p className="text-sm text-muted-foreground">
                      {userId ? "This user hasn't posted yet." : "Be the first to share your thoughts!"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            paginatedBlogs.map((blog: BlogModel) => (
              <Card key={blog.id} className="md:p-0 p-0 shadow-sm hover:shadow-md transition-shadow duration-200 border-accent border">
                <CardHeader className="pb-4 ">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${blog.userId}`} />
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h2 className="text-xl font-semibold leading-tight">{blog.title}</h2>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                          <Calendar className="h-3 w-3" />
                          {blog.createdAt && moment(blog.createdAt).format("MMM D, YYYY")}
                          {session?.user.id === blog.userId && (
                            <Badge variant="secondary" className="ml-2">
                              Your Post
                            </Badge>
                          )}
                          {session && session.user.id === blog.userId && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-auto p-2 w-auto cursor-pointer border-0"
                                onClick={() => setEditBlog(blog)}
                                title="Edit Blog"
                              >
                                <FaEdit />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-auto p-2 w-auto cursor-pointer border-0 text-destructive hover:bg-destructive/10"
                                onClick={() => setDeleteBlog(blog)}
                                title="Delete Blog"
                              >
                                <Trash />
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-4">
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{blog.content}</p>
                </CardContent>
                <Separator />
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          <span className="px-2 py-1 text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </span>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </>
  );
}
