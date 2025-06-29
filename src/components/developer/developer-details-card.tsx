"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DeveloperDto } from "@/dtos/developer.dto"
import { Github, Globe, Linkedin, Twitter } from "lucide-react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useState } from "react"
import AddEditBlog from "../blog/add-edit-blog"
import Loader from "../common/loader"
import { Button } from "../ui/button"
import DeveloperUpdateForm from "./updatedeveloper"


export interface SocialLinks {
  github?: string
  twitter?: string
  linkedin?: string
  website?: string
}

interface DeveloperDetailsCardProps {
  developer: DeveloperDto
}

export default function DeveloperDetailsCard({ developer }: DeveloperDetailsCardProps) {
  const { userId, id, name, bio, avatar, skills, social = {} } = developer;
  const { data: session } = useSession();
  const [showUpdate, setShowUpdate] = useState(false);
  const [isLoading, setLoading] = useState(false);

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  // Display first 6 skills, show count for remaining
  const displayedSkills = skills.slice(0, 6)
  const remainingSkillsCount = skills.length - 6

  const socialLinks = [
    {
      icon: Github,
      url: social.github,
      label: "GitHub",
      color: "hover:text-gray-900 dark:hover:text-gray-100",
    },
    {
      icon: Twitter,
      url: social.twitter,
      label: "Twitter",
      color: "hover:text-blue-500",
    },
    {
      icon: Linkedin,
      url: social.linkedin,
      label: "LinkedIn",
      color: "hover:text-blue-600",
    },
    {
      icon: Globe,
      url: social.website,
      label: "Website",
      color: "hover:text-green-600",
    },
  ]

  function refreshBlogs(): void {
    window.location.reload();
  }



  return (
    <div className="container mx-auto" key={id}>
      <Card className="w-full group transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50">
        <CardHeader className="pb-4">
          <div className="relative mb-4">
            <Avatar className="w-40 h-40 border-4 rounded-none border-white shadow-lg relative">
              <AvatarImage src={avatar || undefined} alt={name} />
              <AvatarFallback className="bg-gradient-to-br bg-primary rounded-none text-primary-foreground font-semibold text-lg">
                {getInitials(name)}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300 uppercase">
              {name}
            </h3>
            <div className="flex items-center flex-wrap gap-3">
              {session?.user.id === userId && (
                <>                <AddEditBlog userId={session.user.id} triggerLabel="Add Blog" onSuccess={refreshBlogs} />
                  <Dialog open={showUpdate} onOpenChange={setShowUpdate}>
                    <DialogTrigger asChild>
                      <Button onClick={() => setShowUpdate(true)}>Edit Profile</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg w-full">
                      <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>
                      </DialogHeader>
                      <DeveloperUpdateForm
                        onSuccess={() => {
                          setShowUpdate(false);
                          setLoading(true);
                          setTimeout(() => {
                            window.location.reload();
                            setLoading(false);
                          }, 500);
                        }}
                      />
                    </DialogContent>
                  </Dialog>
                </>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {bio && (
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-3">{bio}</p>
            </div>
          )}

          {skills.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Skills</h4>
              <div className="flex flex-wrap gap-1.5">
                {displayedSkills.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-xs px-2 py-1 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30 transition-colors"
                  >
                    {skill}
                  </Badge>
                ))}
                {remainingSkillsCount > 0 && (
                  <Badge variant="outline" className="text-xs px-2 py-1 text-gray-600 dark:text-gray-400">
                    +{remainingSkillsCount} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          <div className="flex justify-start space-x-4 pt-2">
            {socialLinks.map(({ icon: Icon, url, label, color }) =>
              url ? (
                <Link
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-500 dark:text-gray-400 transition-colors duration-200 ${color}`}
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </Link>
              ) : null,
            )}
          </div>
        </CardContent>
      </Card>
      {isLoading && (
        <Loader />
      )}
    </div>
  )
}
