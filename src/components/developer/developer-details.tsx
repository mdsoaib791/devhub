'use client'
import { useGetDeveloperById } from "@/hooks/services-hook/use-developer.service.hook";
import DeveloperCard from "./developer-card";

interface DeveloperDetailsProps {
  id: string
}
function DeveloperDetailsWrapper({ id }: DeveloperDetailsProps) {
  const { data, isLoading, error } = useGetDeveloperById(id);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading developers</div>;
  return (
    <div>
      <h1>Developers Details</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {data && <DeveloperCard key={data.id} developer={data} />}
        {/* Render blogs if available */}

      </div>
    </div>
  )
}

export default DeveloperDetailsWrapper
