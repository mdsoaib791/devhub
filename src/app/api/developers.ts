import { NextApiRequest, NextApiResponse } from 'next';

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

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const page = parseInt(req.query.page as string) || 1;
  const limit = 10;
  const start = (page - 1) * limit;
  const end = start + limit;

  const data = allDevelopers.slice(start, end);
  const hasMore = end < allDevelopers.length;

  res.status(200).json({ data, nextPage: hasMore ? page + 1 : null });
}
