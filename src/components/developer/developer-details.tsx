'use client'
import { useGetDeveloperById } from "@/hooks/services-hook/use-developer.service.hook";
import { useSession } from "next-auth/react";
import BlogList from "../blog";
import DeveloperDetailsCard from "./developer-details-card";

interface DeveloperDetailsProps {
  id: string
}
function DeveloperDetailsWrapper({ id }: DeveloperDetailsProps) {
  const { data: developer, isLoading, error } = useGetDeveloperById(id);
  const { data: session } = useSession();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading developer details.</div>;

  return (
    <>
      <div className="container mx-auto px-2 py-16">
        <div className="flex flex-wrap gap-4 mb-8">
          {developer && <DeveloperDetailsCard key={developer.id} developer={developer} />}
        </div>
      </div>
      <div className="py-16 bg-secondary">
        <div className="container mx-auto">
          <div className="text-center">
            <h2 className="text-center mb-4 font-bold text-2xl">Developer Blogs</h2>
          </div>
          <BlogList userId={developer?.userId || session?.user.id} />
        </div>
      </div>
    </>
  )
}

export default DeveloperDetailsWrapper
