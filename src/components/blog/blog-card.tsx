import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { SlCalender } from "react-icons/sl";

interface BlogCardProps {
    className?: string
}

export default function BlogCard({ className }: BlogCardProps) {
    return (
        <div className={cn(`rounded-lg overflow-hidden shadow-lg bg-background border w-full`, className)}>
            <div className="relative">
                <Image
                    src="https://www.transcriptioncertificationinstitute.org/blog/uploads/tci-blog-post-images-1920-x-1080-px-8.jpg"
                    alt="Legal Transcription Jobs"
                    className="w-full h-auto object-cover"
                    width={500}
                    height={400}
                />
            </div>
            <div className="p-4">
                <p className="text-sm flex items-center gap-2 justify-between">
                    <span className="text-muted-foreground">
                        Legal Transcription
                    </span>
                    <span className="text-muted-foreground flex items-center gap-1"><SlCalender /> 2/12/2025</span>
                </p>
                <h2 className="text-xl text-secondary hover:text-primary">
                    <Link href="/blog/companies-offering-legal-transcription-jobs-from-home" title="10 Companies Offering Legal Transcription Jobs From Home" className="text-secondary hover:text-primary">
                        10 Companies Offering Legal Transcription Jobs From Home
                    </Link>
                </h2>
            </div>
        </div>
    );
}
