import BlogDetails from "@/components/blog/blog-details";

export default function Page({ params }: { params: { id: string } }) {
  return <BlogDetails blogId={params.id} />;
}
