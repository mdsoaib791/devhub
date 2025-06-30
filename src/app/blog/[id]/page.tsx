import BlogDetails from '@/components/blog/blog-details';
import BlogService from '@/services/blog.service';
import type { Metadata } from 'next';

// ✅ Mark `params` as Promise in function signature to match expectations
export default async function BlogDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <BlogDetails blogId={id} />;
}

// ✅ Static Params for SSG
export async function generateStaticParams(): Promise<{ id: string }[]> {
  const blogService = new BlogService();
  const blogs = await blogService.getAll();

  return blogs.map((blog: { id: string }) => ({
    id: blog.id,
  }));
}

// ✅ Metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;

  const blogService = new BlogService();
  const blog = await blogService.getById(id);

  return {
    title: blog.title,
    description: blog.summary || blog.content?.slice(0, 150),
  };
}
