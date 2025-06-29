'use client'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Button } from '../ui/button'

export default function HomePage() {
  const session = useSession()
  const isAuthenticated = session.status === 'authenticated'
  console.log(isAuthenticated)
  return (
    <div className="min-h-screen flex items-center justify-center bg-accent p-4">
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl mb-5 font-extrabold">
            🚀 Welcome to DevHub
          </h1>
          <p className="mb-6 text-lg text-gray-700 dark:text-gray-200">
            <span className="font-semibold text-primary">DevHub</span> is a modern developer portfolio and blogging platform built with <span className="font-semibold text-blue-600">Next.js</span>, <span className="font-semibold text-purple-600">shadcn/ui</span>, and <span className="font-semibold text-green-600">React Query</span>.
          </p>
          <div className="mb-6 text-left bg-white/80 dark:bg-gray-900/80 rounded-lg shadow p-4">
            <h2 className="text-xl font-bold mb-2 text-primary">All Features:</h2>
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
                <span className="font-semibold text-orange-700">Blog List & Details</span> – Browse, filter, and view detailed blog posts.
              </li>
              <li>
                <span className="font-semibold text-cyan-700">Comment System</span> – Add and view comments on blog posts (login required).
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
              <li>
                <span className="font-semibold text-red-700">Authentication</span> – Secure login, registration, and route protection.
              </li>
              <li>
                <span className="font-semibold text-lime-700">Toast Notifications</span> – User feedback for actions and errors.
              </li>
              <li>
                <span className="font-semibold text-fuchsia-700">Filtering & Pagination</span> – Filter developers/blogs and paginate results.
              </li>
              <li>
                <span className="font-semibold text-amber-700">Responsive Design</span> – Fully responsive and mobile-friendly UI.
              </li>
            </ul>
          </div>
          <p className="mb-6 text-base text-gray-600 dark:text-gray-300">
            <span className="font-semibold text-primary">DevHub</span> is perfect for learning full-stack React patterns and quickly prototyping developer-focused applications.
          </p>
          {!isAuthenticated ? (
            <Button asChild>
              <Link href="/register" className="text-primary-foreground hover:text-primary font-semibold text-base">
                Register Now
              </Link>
            </Button>
          ) : (
            <div className="flex justify-center items-center gap-5 flex-wrap">
              <Button asChild>
                <Link href="/developers" className="text-primary-foreground hover:text-primary font-semibold text-base">
                  Find Developers
                </Link>
              </Button>
              <Button asChild>
                <Link href="/blog" className="text-primary-foreground hover:text-primary font-semibold text-base">
                  Blogs
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


