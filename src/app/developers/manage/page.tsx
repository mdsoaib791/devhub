import DeveloperAddUpdateForm from "@/components/developer/updatedeveloper";
import config from "@/config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Update Profile - ${config.appName}`,
};

export default function Page() {
  return (
    <div>
      <DeveloperAddUpdateForm />
    </div>
  )
}


