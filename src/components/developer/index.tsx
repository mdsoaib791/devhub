'use client'

import { useGetAllDevelopers } from "@/hooks/services-hook/use-developer.service.hook";


function DevelopersWrapper() {
  const { data, isLoading, error } = useGetAllDevelopers({});

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading developers</div>;
  console.log("data", data);

  return (
    <div>
      <h1>Developers</h1>
      <ul>
        {data?.map((dev: any) => (
          <li key={dev.id}>
            <strong>{dev.name}</strong> ({dev.email})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DevelopersWrapper
