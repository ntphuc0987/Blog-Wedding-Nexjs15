import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { notFound, redirect } from 'next/navigation'
import React from 'react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { handleSubmisson, handleUpdate } from '@/app/action'
import Submitbutton from '@/components/general/Submitbutton'
import { prisma } from '@/app/utils/db'

type Props = { params: { id: string } };


const page = async ({ params: { id } }: Props) => {

    const { getUser } = getKindeServerSession()
    const user = await getUser()
    if (!user) {
        return redirect("/api/auth/login")
    }

    const post = await prisma.blogPost.findFirst({
        where: { id, authorId: user.id },
    });

    if (!post) return notFound();

    return (
        <div>
            <Card className='max-w-lg mx-auto mt-10'>
                <CardHeader>
                    <CardTitle>Edit Post</CardTitle>
                    <CardDescription>
                        Create a new post to share
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className='flex flex-col gap-4' action={handleUpdate}>
                        <Input type="hidden" name="id" defaultValue={post.id} />

                        <div className='flex flex-col gap-2 mb-4'>
                            <Label>
                                Title
                            </Label>
                            <Input name="title" required type="text" defaultValue={post.title} placeholder='Title' />
                        </div>
                        <div className='flex flex-col gap-2 mb-4'>
                            <Label>
                                Content
                            </Label>
                            <Textarea name="content" className='resize-none' rows={10} required defaultValue={post.content} />
                        </div>
                        <div className='flex flex-col gap-2 mb-4'>
                            <Label>
                                Image URL
                            </Label>
                            <Input name="url" required type="url" placeholder='Image URL' defaultValue={post.imageUrl} />
                        </div>
                        <Submitbutton />
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default page