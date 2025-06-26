import { NextResponse } from 'next/server';

const allDevelopers = Array.from({ length: 50 }, (_, i) => ({
  id: `${i + 1}`,
  name: `Dev ${i + 1}`,
  avatar: `https://i.pravatar.cc/150?img=${i + 1}`,
  bio: `Bio for Dev ${i + 1}`,
  skills: ["React", "Node", "TypeScript"].slice(0, (i % 3) + 1),
  social: {
    github: "https://github.com/dev",
    linkedin: "https://linkedin.com/in/dev",
  }
}));

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = 10;
  const start = (page - 1) * limit;
  const end = start + limit;

  const data = allDevelopers.slice(start, end);
  const nextPage = end < allDevelopers.length ? page + 1 : null;

  return NextResponse.json({ data, nextPage });
}
