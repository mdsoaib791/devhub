import DeveloperDetailsWrapper from "@/components/developer/developer-details"

interface PageProps {
  params: Promise<{
    id: string
  }>

}

export default async function BlogPage({ params }: PageProps) {
  const { id } = await params

  return (
    <DeveloperDetailsWrapper id={id} />
  )
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params

  return {
    title: `Blog Post ${id}`,
    description: `Read blog post ${id}`,
  }
}
