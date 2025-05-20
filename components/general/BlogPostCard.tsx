import Image from 'next/image';
import Link from 'next/link'
import React from 'react'

interface IappProps {



    data: {
        id: string;
        title: string;
        content: string;
        imageUrl: string;
        authorId: string;
        authorName: string;
        authorImage: string;
        createdAt: Date;
        updatedAt: Date;
    }
}

const BlogPostCard = ({ data }: IappProps) => {
    return (
        <div className='group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-shadow duration-300 hover:shadow-lg'>
            <Link href={`/post/${data.id}`} className='block w-full h-full'>
                <div className='relative aspect-video overflow-hidden'>
                    {data.imageUrl ? (
                        <Image src={data.imageUrl} alt={data.title} fill className='object-cover transition-transform duration-100 group-hover:scale-105' />
                    ) : (
                        <div className='w-full h-full bg-gray-200 flex items-center justify-center'>
                            <span className='text-gray-500'>No Image Available</span>
                        </div>
                    )}
                </div>
                <div className='p-4'>
                    <h3 className='mb-2 text-lg font-semibold text-gray-900 line-clamp-1'>
                        {data.title}
                    </h3>
                    <p className='text-sm text-gray-700 line-clamp-2 mb-5'>
                        {data.content}
                    </p>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center space-x-2 '>
                            <div className='relative size-8 overflow-hidden rounded-full'>
                                <Image src={data.authorImage} alt={data.authorName} fill className='object-cover' />
                            </div>
                            <p className='text-sm font-medium text-gray-700'>
                                {data.authorName}
                            </p>
                        </div>
                        <time className='text-xs text-gray-500'>
                            {new Date(data.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </time>
                    </div>
                </div>
            </Link>
            <Link href={{ pathname: `/dashboard/edit/${data.id}` }} className='absolute top-2 right-2 bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition duration-200'>
                Edit
            </Link>
        </div>
    )
}

export default BlogPostCard