import { prisma } from '@/app/utils/db'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

export const revalidate = 60;

const getData = async (id: string) => {
    
    const data = await prisma.blogPost.findUnique({
        where: {
            id: id,
        }
    })

    if (!data) {
        return notFound()
    }

    return data
}

type Params = Promise<{ id: string }>

const IdPage = async ({ params }: { params: Params }) => {
    const { id } = await params;
    const data = await getData(id)
    return (
        <div className='max-w-3xl mx-auto py-8 px-4'>
            <Link href="/dashboard">
                Back to Posts
            </Link>

            <div className='mb-8 mt-6'>
                <h1 className='text-3xl font-bold tracking-tight mb-4'>
                    {data.title}
                </h1>
                <div className='flex items-center space-x-4'>
                    <div className='flex items-center space-x-2'>
                        <div className='relative size-10 overflow-hidden rounded-full'>
                            <Image src={data.imageUrl} alt={data.authorName} fill className='object-cover' />
                        </div>
                        <p>{data.authorName}</p>
                    </div>
                    <p className='text-sm text-gray-500'>
                        {data.createdAt.toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </p>
                </div>
            </div>

            <div className='relative h-[400px] w-full mb-8 overflow-hidden rounded-lg '>
                <Image src={data.imageUrl} alt={data.title} fill />
            </div>

            <div>
                <p className='text-gray-700 text-lg mb-4 text-balance'>
                    {data.content}
                </p>
            </div>
        </div>
    )
}

export default IdPage