// src/components/developer/DeveloperProfileDetails.tsx

import { DeveloperDto } from '@/dtos/developer.dto';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';


export default function DeveloperProfileDetails({ dev }: { dev: DeveloperDto }) {
  return (
    <div className="space-y-6">



      <Link href="/developers" className="inline-flex items-center text-blue-600 hover:underline">
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Developer List
      </Link>

      {/* Basic Info */}
      <div className="text-center">
        <img src={dev.avatar} alt={dev.name} className="w-24 h-24 rounded-full mx-auto" />
        <h2 className="text-2xl font-bold mt-2">{dev.name}</h2>
        <p className="text-muted-foreground">{dev.bio}</p>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap justify-center gap-2">
        {dev.skills.map((skill) => (
          <span key={skill} className="px-3 py-1 bg-zinc-200 dark:bg-zinc-700 rounded-full text-sm">
            {skill}
          </span>
        ))}
      </div>

      {/* Blogs */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Blog Posts</h3>
        {dev.blogs?.length ? (
          <ul className="space-y-2">
            {dev.blogs.map((blog) => (
              <li key={blog.id} className="border-b pb-2">
                <Link href={`/blogs/${blog.id}`}>
                  <p className="text-lg font-medium hover:underline">{blog.title}</p>
                  <p className="text-sm text-zinc-500">{blog.excerpt}</p>
                  <p className="text-xs text-zinc-400">{new Date(blog.date).toLocaleDateString()}</p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">No blog posts yet.</p>
        )}
      </div>
    </div>
  );
}
