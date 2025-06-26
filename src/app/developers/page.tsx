'use client';

import DeveloperCard from '@/components/developer/developer-card';
import { fetchDevelopers } from '@/services/developerService';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

export default function DevelopersPage() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['developers'],
    queryFn: fetchDevelopers,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
  });

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // Auto fetch on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.disconnect();
      }
    };
  }, [hasNextPage, fetchNextPage]);

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Developers</h1>

      {status === 'pending' && <p>Loading developers...</p>}
      {status === 'error' && <p>Error loading developers.</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data?.pages.flatMap(page =>
          page.data.map(dev => (
            <DeveloperCard key={dev.id} dev={dev} />
          ))
        )}
      </div>

      <div ref={loadMoreRef} className="mt-6 text-center">
        {isFetchingNextPage
          ? <p>Loading more...</p>
          : !hasNextPage && <p>No more developers</p>}
      </div>
    </div>
  );
}
