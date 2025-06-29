"use client"

import { useGetAllDevelopers } from "@/hooks/services-hook/use-developer.service.hook"
import { useMemo, useState } from "react"
import DeveloperCard from "./developer-card"

// shadcn/ui components
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

import type { DeveloperDto } from "@/dtos/developer.dto"
import { Filter, Search, Users, X } from "lucide-react"
import Loader from "../common/loader"

function DevelopersWrapper() {
  const { data, isLoading, error } = useGetAllDevelopers()
  const [search, setSearch] = useState("")
  const [selectedSkill, setSelectedSkill] = useState("all")

  // Get all unique skills for the select box
  const allSkills = useMemo(() => {
    if (!data) return []
    const skillsSet = new Set<string>()
      ; (data as DeveloperDto[]).forEach((dev) => {
        dev.skills?.forEach((skill: string) => skillsSet.add(skill))
      })
    return Array.from(skillsSet)
  }, [data])

  if (isLoading) return <Loader />

  if (error)
    return (
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6">
            <div className="text-center text-destructive">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">Error loading developers</p>
              <p className="text-sm text-muted-foreground mt-2">Please try again later</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )

  // Filter developers by name and selected skill
  const filtered = (data as DeveloperDto[] | undefined)?.filter(
    (dev) =>
      dev.name.toLowerCase().includes(search.toLowerCase()) &&
      (selectedSkill === "all" ||
        dev.skills?.map((s: string) => s.toLowerCase()).includes(selectedSkill.toLowerCase())),
  )

  const clearFilters = () => {
    setSearch("")
    setSelectedSkill("all")
  }

  const hasActiveFilters = search !== "" || selectedSkill !== "all"

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Users className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Developers Directory
            </h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover talented developers and explore their skills and expertise
          </p>
        </div>

        {/* Filters Section */}
        <Card className="mb-8 shadow-lg border-0 bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Filter className="h-5 w-5" />
              Filter Developers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search developers by name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 h-11 bg-background/50"
                />
              </div>

              {/* Skills Select */}
              <div className="lg:col-span-1">
                <Select value={selectedSkill} onValueChange={setSelectedSkill}>
                  <SelectTrigger className="h-11 bg-background/50">
                    <SelectValue placeholder="Filter by skill" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Skills</SelectItem>
                    {allSkills.map((skill) => (
                      <SelectItem key={skill} value={skill}>
                        {skill}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Clear Filters Button */}
              <div className="lg:col-span-1">
                {hasActiveFilters && (
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="w-full h-11 bg-background/50 hover:bg-destructive hover:text-destructive-foreground transition-colors"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Clear Filters
                  </Button>
                )}
              </div>
            </div>

            {/* Active Filters Display */}
            {hasActiveFilters && (
              <>
                <Separator className="my-4" />
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm text-muted-foreground">Active filters:</span>
                  {search && (
                    <Badge variant="secondary" className="gap-1">
                      Search: {search}
                      <X className="h-3 w-3 cursor-pointer hover:text-destructive" onClick={() => setSearch("")} />
                    </Badge>
                  )}
                  {selectedSkill !== "all" && (
                    <Badge variant="secondary" className="gap-1">
                      Skill: {selectedSkill}
                      <X
                        className="h-3 w-3 cursor-pointer hover:text-destructive"
                        onClick={() => setSelectedSkill("all")}
                      />
                    </Badge>
                  )}
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Results Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {filtered?.length === 0
                ? "No developers found"
                : `${filtered?.length} developer${filtered?.length === 1 ? "" : "s"} found`}
            </h2>
            {filtered && filtered.length > 0 && (
              <Badge variant="outline" className="text-sm">
                Total: {filtered.length}
              </Badge>
            )}
          </div>
        </div>

        {/* Developers Grid */}
        {filtered && filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {filtered.map((dev) => (
              <div key={dev.id} className="transform transition-all duration-200 hover:scale-105">
                <DeveloperCard developer={dev} />
              </div>
            ))}
          </div>
        ) : (
          <Card className="max-w-md mx-auto">
            <CardContent className="pt-6">
              <div className="text-center">
                <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                <p className="text-lg font-medium text-muted-foreground">No developers found</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Try adjusting your search criteria or clearing the filters
                </p>
                {hasActiveFilters && (
                  <Button variant="outline" onClick={clearFilters} className="mt-4 bg-transparent">
                    Clear all filters
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default DevelopersWrapper
