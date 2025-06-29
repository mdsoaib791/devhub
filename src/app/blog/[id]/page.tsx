import BlogDetails from "@/components/blog/blog-details";
import type { FC } from "react";

const BlogPage: FC<{ params: { id: string } }> = ({ params }) => {
  return <BlogDetails blogId={params.id} />;
};

export default BlogPage;
