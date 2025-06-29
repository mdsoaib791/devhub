import HomePage from "@/components/home";
import config from "@/config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Home - ${config.appName}`,
  description: 'Welcome to DevHub, your hub for developers',
};

export default function Home() {
  return (
    <HomePage />
  );
}
