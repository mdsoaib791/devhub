'use client'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Button } from '../ui/button'

export default function HomePage() {
  const session = useSession()
  const isAuthenticated = session.status === 'authenticated'
  return (
    <div className="min-h-screen flex items-center justify-center bg-accent p-4">
      <div className="w-full max-w-2xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl mb-5 font-extrabold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent drop-shadow">
            🚀 Welcome to DevHub
          </h1>
          <p className="mb-4 text-lg text-gray-700 dark:text-gray-200">
            <span className="font-semibold text-primary">DevHub</span> is a modern developer portfolio and blogging platform built with <span className="font-semibold text-blue-600">Next.js</span>, <span className="font-semibold text-purple-600">shadcn/ui</span>, and <span className="font-semibold text-green-600">React Query</span>.
          </p>
          <div className="mb-6 text-left bg-white/80 dark:bg-gray-900/80 rounded-lg shadow p-4">
            <h2 className="text-xl font-bold mb-2 text-primary">Key Features:</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-800 dark:text-gray-100">
              <li>
                <span className="font-semibold text-blue-700">Developer Profile Management</span> – Create, update, and showcase your developer profile.
              </li>
              <li>
                <span className="font-semibold text-purple-700">Skill Tagging</span> – Add and display your technical skills.
              </li>
              <li>
                <span className="font-semibold text-green-700">Social Links</span> – Connect your GitHub, LinkedIn, Twitter, and personal website.
              </li>
              <li>
                <span className="font-semibold text-pink-700">Blog Editor</span> – Write and share technical blogs with the community.
              </li>
              <li>
                <span className="font-semibold text-yellow-700">React Hook Form</span> – Robust and type-safe form handling.
              </li>
              <li>
                <span className="font-semibold text-teal-700">React Query</span> – Effortless data fetching, caching, and UI sync.
              </li>
              <li>
                <span className="font-semibold text-gray-700">json-server</span> – Mock backend APIs for rapid prototyping.
              </li>
              <li>
                <span className="font-semibold text-indigo-700">shadcn/ui</span> – Beautiful, accessible, and customizable UI components.
              </li>
            </ul>
          </div>
          <p className="mb-6 text-base text-gray-600 dark:text-gray-300">
            <span className="font-semibold text-primary">DevHub</span> is perfect for learning full-stack React patterns and quickly prototyping developer-focused applications.
          </p>
          {isAuthenticated ? <Button asChild>
            <Link href="/register" className="text-white font-semibold text-base">
              Register Now
            </Link>
          </Button> :
            <div className="flex justify-center items-center gap-5 flex-wrap">
              <Button asChild>
                <Link href="/developers" className="text-white font-semibold text-base">
                  Find Developers
                </Link>
              </Button>
              <Button variant={'secondary'} asChild>
                <Link href="/blog" className="text-white font-semibold text-base">
                  Blogs
                </Link>
              </Button>
            </div>}
        </div>
      </div>
    </div>
  )
}


