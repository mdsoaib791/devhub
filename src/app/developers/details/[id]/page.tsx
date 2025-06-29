import DeveloperDetailsWrapper from "@/components/developer/developer-details";
import config from "@/config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Developer Details - ${config.appName}`,
};

export default function Page({ params }: { params: { id: string } }) {
  return <DeveloperDetailsWrapper id={params.id} />;
}
