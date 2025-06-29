import BlogDetails from "@/components/blog/blog-details";
import config from "@/config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Blog Details - ${config.appName}`,
};


interface PageProps {
  params: {
    id: string
  }
}

export default function BlogPage({ params }: PageProps) {
  const { id } = params

  return <BlogDetails blogId={id} />;
}
