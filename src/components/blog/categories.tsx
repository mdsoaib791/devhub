import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Title } from "../common/heading";
import { Input } from "../ui/input";

interface CategoriesProps {
    className?: string
}

export default function Categories({ className }: CategoriesProps) {
    return (
        <div className={cn(`border-b py-2`, className)}>
            <Title>Categories</Title>
            <Input placeholder='Search..' />
        </div>
    );
}
