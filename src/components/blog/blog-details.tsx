import React from 'react'
import BlogFilter from './filter';
import Image from 'next/image';
import Link from 'next/link';
import { SlCalender } from 'react-icons/sl';
import { Title } from '../common/heading';
import { Badge } from '../ui/badge';


export default function BlogDetails() {
    return (
        <div className="py-10 xl:py-16">
            <div className="container">
                <div className='grid grid-cols-3 gap-5'>
                    <div className="col-span-2">
                        <h2 className='text-2xl text-secondary mb-4'>
                            10 Companies Offering Legal Transcription Jobs From Home
                        </h2 >
                        <p className="text-sm flex items-center gap-2 justify-between mb-4">
                            <span className="text-muted-foreground">
                                Legal Transcription
                            </span>
                            <span className="text-muted-foreground flex items-center gap-1"><SlCalender /> 2/12/2025</span>
                        </p>
                        <div className="relative">
                            <Image
                                src="https://www.transcriptioncertificationinstitute.org/blog/uploads/tci-blog-post-images-1920-x-1080-px-8.jpg"
                                alt="Legal Transcription Jobs"
                                className="w-full h-auto object-cover rounded-md"
                                width={500}
                                height={400}
                            />
                        </div>
                        <div className="mt-4">
                            <p>The world of remote work is booming, and if you’ve got a knack for precision, a good ear, and a passion for the legal field, legal transcription might just be your calling. Imagine working from the comfort of your home, setting your own hours, and diving into the fascinating world of legal proceedings; all while earning a steady income. </p>
                            <p>The world of remote work is booming, and if you’ve got a knack for precision, a good ear, and a passion for the legal field, legal transcription might just be your calling. Imagine working from the comfort of your home, setting your own hours, and diving into the fascinating world of legal proceedings; all while earning a steady income. </p>
                            <p>The world of remote work is booming, and if you’ve got a knack for precision, a good ear, and a passion for the legal field, legal transcription might just be your calling. Imagine working from the comfort of your home, setting your own hours, and diving into the fascinating world of legal proceedings; all while earning a steady income. </p>
                            <p>The world of remote work is booming, and if you’ve got a knack for precision, a good ear, and a passion for the legal field, legal transcription might just be your calling. Imagine working from the comfort of your home, setting your own hours, and diving into the fascinating world of legal proceedings; all while earning a steady income. </p>
                            <p>The world of remote work is booming, and if you’ve got a knack for precision, a good ear, and a passion for the legal field, legal transcription might just be your calling. Imagine working from the comfort of your home, setting your own hours, and diving into the fascinating world of legal proceedings; all while earning a steady income. </p>

                            <div className="flex items-center gap-1 flex-wrap">
                                <Title className='mb-0'>Tags:</Title>
                                <Link href="/blog/1" title='Legal Transcription Remote Jobs'><Badge>Legal Transcription Remote Jobs</Badge></Link>
                                <Link href="/blog/1" title='Legal Transcription Remote Jobs'><Badge>Legal Transcription Remote Jobs</Badge></Link>
                                <Link href="/blog/1" title='Legal Transcription Remote Jobs'><Badge>Legal Transcription Remote Jobs</Badge></Link>
                                <Link href="/blog/1" title='Legal Transcription Remote Jobs'><Badge>Legal Transcription Remote Jobs</Badge></Link>
                                <Link href="/blog/1" title='Legal Transcription Remote Jobs'><Badge>Legal Transcription Remote Jobs</Badge></Link>
                                <Link href="/blog/1" title='Legal Transcription Remote Jobs'><Badge>Legal Transcription Remote Jobs</Badge></Link>
                            </div>

                        </div>


                    </div>
                    <div className="col-span-1 flex flex-col gap-6">
                        <BlogFilter />
                    </div>
                </div>
            </div>
        </div>
    )
}
