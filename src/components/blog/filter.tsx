'use client'
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { Title } from "../common/heading";
import { Input } from "../ui/input";
import { Card } from "../ui/card";
import { SelectSearch } from '../common/select-search';

import PopularPostsCars from './popular-post-cars';

interface FilterProps {
    className?: string;
}

export default function BlogFilter({ className }: FilterProps) {
    //update with correct ctegory once api is ready
    // const uniqueCategories = [
    //     ...Array.from(new Set(resourcesForTranscriptionistData.map(item => item.category)))
    // ];
    const [activeCategory, setActiveCategory] = useState<string>("Transcription Tools and Equipment");
    return (
        <div className="sticky top-[150px]">
            <div className="col-span-1 flex flex-col gap-6">

                <Card className={cn("shadow-md p-4", className)}>
                    <Title>Search</Title>
                    <Input placeholder='Search..' />
                </Card>
                {/* <Card className={cn("shadow-md p-4", className)}>
                    <Title>Categories</Title>
                    <SelectSearch
                        placeholder="Category*"
                        buttonClass="w-full"
                        disableSearch={true}
                        items={uniqueCategories.map((category) => ({
                            label: category,
                            value: category,
                            key: category
                        }))}
                        value={activeCategory}
                        valueType="string"
                        containerName="category-selector"
                        onChange={(value) => setActiveCategory(value as string)}
                    />
                </Card> */}
                <Card className='shadow-md'>
                    <Title>Popular Posts</Title>
                    <PopularPostsCars />
                    <PopularPostsCars />
                    <PopularPostsCars />
                    <PopularPostsCars />
                </Card>
            </div>
        </div>
    );
}
