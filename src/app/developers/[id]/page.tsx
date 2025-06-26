// src/app/developers/[id]/page.tsx
import { fetchDeveloperById } from '@/services/developerService';
import { Github, Linkedin } from 'lucide-react';
import { notFound } from 'next/navigation';

export default async function DeveloperProfile({ params }: { params: { id: string } }) {
  let dev;

  try {
    dev = await fetchDeveloperById(params.id);
  } catch (error) {
    return notFound();
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col items-center text-center">
        <img
          src={dev.avatar}
          alt={dev.name}
          className="w-28 h-28 rounded-full object-cover border mb-4"
        />
        <h1 className="text-3xl font-bold">{dev.name}</h1>
        <p className="text-zinc-600 dark:text-zinc-400">{dev.bio}</p>

        <div className="flex gap-2 mt-4 flex-wrap justify-center">
          {dev.skills.map((skill: string) => (
            <span
              key={skill}
              className="bg-zinc-200 dark:bg-zinc-700 text-sm px-3 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="flex gap-4 mt-4">
          {dev.social?.github && (
            <a href={dev.social.github} target="_blank">
              <Github className="w-5 h-5 hover:text-black dark:hover:text-white" />
            </a>
          )}
          {dev.social?.linkedin && (
            <a href={dev.social.linkedin} target="_blank">
              <Linkedin className="w-5 h-5 hover:text-blue-600 dark:hover:text-blue-400" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
