
import { DeveloperDto } from '@/dtos/developer.dto';
import Link from 'next/link';

export default function DeveloperCard({ dev }: { dev: DeveloperDto }) {
  return (
    <Link href={`/developers/${dev.id}`} className="block border p-4 rounded-md shadow-sm hover:shadow-md">
      <div className="flex items-center gap-4">
        <img src={dev.avatar} alt={dev.name} className="w-14 h-14 rounded-full" />
        <div>
          <h3 className="font-semibold text-lg">{dev.name}</h3>
          <p className="text-sm text-zinc-500">{dev.bio}</p>
          <div className="flex gap-1 mt-1 flex-wrap">
            {dev.skills.map((s) => (
              <span key={s} className="text-xs bg-zinc-100 dark:bg-zinc-700 px-2 py-0.5 rounded">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
