"use client";

import { useGetAllDevelopers } from "@/hooks/services-hook/use-developer.service.hook";
import { useMemo, useState } from "react";
import DeveloperCard from "./developer-card";

// shadcn/ui components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function DevelopersWrapper() {
  const { data, isLoading, error } = useGetAllDevelopers({});
  const [search, setSearch] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("all");

  // Get all unique skills for the select box
  const allSkills = useMemo(() => {
    if (!data) return [];
    const skillsSet = new Set<string>();
    data.forEach((dev: any) => {
      dev.skills?.forEach((skill: string) => skillsSet.add(skill));
    });
    return Array.from(skillsSet);
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading developers</div>;

  // Filter developers by name and selected skill
  const filtered = data?.filter(
    (dev: any) =>
      dev.name.toLowerCase().includes(search.toLowerCase()) &&
      (selectedSkill === "all" ||
        dev.skills?.map((s: string) => s.toLowerCase()).includes(selectedSkill.toLowerCase()))
  );

  const clearFilters = () => {
    setSearch("");
    setSelectedSkill("all");
  };

  return (
    <div className="container mx-auto">
      <div className="py-8">
        <h1 className="text-2xl font-bold">Developers List</h1>
      </div>

      {/* Filter UI using shadcn/ui */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <Input
          placeholder="Search by name"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full h-10"
        />
        <Select value={selectedSkill} onValueChange={setSelectedSkill}>
          <SelectTrigger className="w-full h-10">
            <SelectValue placeholder="All Skills" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Skills</SelectItem>
            {allSkills.map(skill => (
              <SelectItem key={skill} value={skill}>
                {skill}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {search && selectedSkill && <Button variant="destructive" onClick={clearFilters} className="w-[100px]">
          Clear Filters
        </Button>}
      </div>

      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered?.map((dev: any) => (
            <DeveloperCard key={dev.id} developer={dev} />
          ))}
        </div>
        {filtered?.length === 0 && <div>No developers found.</div>}
      </div>
    </div>
  );
}

export default DevelopersWrapper;
