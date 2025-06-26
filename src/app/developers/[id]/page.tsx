
import DeveloperProfileDetails from '@/components/developer/developer-profile-details';
import { fetchDeveloperById } from '@/services/developerService';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export default async function DeveloperPage({ params }: { params: { id: string } }) {
  let dev;
  try {
    dev = await fetchDeveloperById(params.id);
  } catch {
    return notFound();
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Suspense fallback={<p>Loading developer profile...</p>}>
        <DeveloperProfileDetails dev={dev} />
      </Suspense>
    </div>
  );
}
