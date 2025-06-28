import React from 'react'
import BlogCard from './blog-card'
import BlogFilter from './filter'

export default function BlogPageWrapper() {
    return (
        <div className="py-10 xl:py-16">
            <div className="container">
                <div className='grid grid-cols-3 gap-5'>
                    <div className="col-span-2 grid grid-cols-2 gap-5">
                        <BlogCard />
                        <BlogCard />
                        <BlogCard />
                        <BlogCard />
                        <BlogCard />
                    </div>
                    <div className="col-span-1 flex flex-col gap-6">
                        <BlogFilter />
                    </div>
                </div>
            </div>
        </div>
    )
}
