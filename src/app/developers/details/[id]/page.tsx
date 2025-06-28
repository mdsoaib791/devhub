import DeveloperDetailsWrapper from "@/components/developer/developer-details";

export default function Page({ params }: { params: { id: string } }) {
  return <DeveloperDetailsWrapper id={params.id} />;
}
