import BlogList from "@/components/blog";
import config from "@/config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Blog - ${config.appName}`,
};

export default function Page() {
  return (
    <div className="py-10 lg:py-16">
      <div className="container mx-auto">
        <BlogList />
      </div>
    </div>
  )
}


