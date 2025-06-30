import BlogDetails from '@/components/blog/blog-details';
import { use } from 'react';

type tParams = Promise<{ slug: string[] }>;

export default function BlogDetailsPage({ params }: { params: tParams }) {
  const { slug }: { slug: string[] } = use(params);
  const id = slug[1];

  return <BlogDetails blogId={id} />;
}
