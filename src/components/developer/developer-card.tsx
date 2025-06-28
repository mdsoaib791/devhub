"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Github, Globe, Linkedin, Mail, Twitter } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"


export interface SocialLinks {
  github?: string
  twitter?: string
  linkedin?: string
  website?: string
}

export interface DeveloperDto {
  id: string
  name: string
  email: string
  bio: string | null
  avatar: string | null
  skills: string[]
  social: SocialLinks
}

interface DeveloperCardProps {
  developer: DeveloperDto
}

export default function DeveloperCard({ developer }: DeveloperCardProps) {
  const router = useRouter();
  const { id, name, email, bio, avatar, skills, social } = developer

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

  return (
    <Card className="w-full group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50">
      <CardHeader className="text-center pb-4">
        <div className="relative mx-auto mb-4">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-sm opacity-20 group-hover:opacity-30 transition-opacity"></div>
          <Avatar className="w-20 h-20 border-4 border-white shadow-lg relative">
            <AvatarImage src={avatar || undefined} alt={name} />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold text-lg">
              {getInitials(name)}
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
            {name}
          </h3>

          <div className="flex items-center justify-center text-sm text-gray-600 dark:text-gray-400">
            <Mail className="w-4 h-4 mr-2" />
            <span className="truncate">{email}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {bio && (
          <div className="text-center">
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

        <div className="flex justify-center space-x-4 pt-2">
          {socialLinks.map(({ icon: Icon, url, label, color }) =>
            url ? (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-gray-500 dark:text-gray-400 transition-colors duration-200 ${color}`}
                aria-label={label}
              >
                <Icon className="w-5 h-5" />
              </a>
            ) : null,
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-4">
        <Button
          asChild
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <Link href={`/developers/details/${id}`}>View Profile</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
