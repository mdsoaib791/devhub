import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface PopularPostsCarsProps {
    className?: string
}

export default function PopularPostsCars({ className }: PopularPostsCarsProps) {
    return (
        <div className={cn(`flex items-center gap-3 border-b py-2`, className)}>

            <div className="w-16 flex-shrink-0">
                <Image
                    src="https://www.transcriptioncertificationinstitute.org/blog/uploads/tci-blog-post-images-1920-x-1080-px-8.jpg"
                    alt="blog title"
                    className="w-full object-cover rounded-md"
                    width={200}
                    height={60}
                />
            </div>
            <div className="flex-1">
                <Link className="text-secondary hover:text-primary"
                    href="/blog/get-started-as-a-transcriptionist-guide-part-1/"
                >
                    How To Get Started As A Transcriptionist – A Complete Guide
                </Link>
            </div>
        </div>
    );
}
