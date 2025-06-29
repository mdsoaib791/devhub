import BlogDetails from "@/components/blog/blog-details";
import config from "@/config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Blog Details - ${config.appName}`,
};

type PageProps = {
  params: {
    id: string;
  };
};

export default function Page({ params }: PageProps) {
  return <BlogDetails blogId={params.id} />;
}
