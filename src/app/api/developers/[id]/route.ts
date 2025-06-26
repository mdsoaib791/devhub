// src/app/api/developers/route.ts

import { NextResponse } from 'next/server';

const mockDevelopers = Array.from({ length: 50 }, (_, i) => ({
  id: `${i + 1}`,
  name: `Developer ${i + 1}`,
  avatar: `https://i.pravatar.cc/150?img=${(i % 70) + 1}`,
  bio: `This is a mock bio for Developer ${i + 1}.`,
  skills: ['React', 'Node.js', 'TypeScript'].slice(0, (i % 3) + 1),
}));

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get('page') || 1);
  const perPage = 10;

  const start = (page - 1) * perPage;
  const end = start + perPage;

  const data = mockDevelopers.slice(start, end);

  return NextResponse.json({
    developers: data,
    hasMore: end < mockDevelopers.length,
  });
}
