"use server"

import { prisma } from "@/app/utils/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"


export const handleSubmisson = async (formData: FormData) => {



    const { getUser } = getKindeServerSession()
    const user = await getUser()

    if (!user) {
        return redirect('/api/auth/login')
    }

    const title = formData.get('title')
    const content = formData.get('content')
    const url = formData.get('url')



    const data = await prisma.blogPost.create({
        data: {
            title: title as string,
            content: content as string,
            imageUrl: url as string,
            authorId: user?.id as string,
            authorImage: user?.picture as string,
            authorName: user?.given_name as string,
        }
    });

    //console.log(data)

    revalidatePath("/")
    return redirect('/dashboard')


}

export const handleUpdate = async (formData: FormData) => {
    "use server"

    // 1) Extract fields
    const id = formData.get("id")
    const title = formData.get("title")
    const content = formData.get("content")
    const url = formData.get("url")

    if (
        typeof id !== "string" || typeof title !== "string" || typeof content !== "string" || typeof url !== "string"
    ) {
        throw new Error("Invalid form data")
    }

    // 2) Verify user
    const { getUser } = await getKindeServerSession()
    const user = await getUser()
    if (!user) {
        redirect("/api/auth/login")
    }

    // 3) Update only if this user owns the post
    const post = await prisma.blogPost.findFirstOrThrow({
        where: { id, authorId: user.id }
    });
    await prisma.blogPost.update({
        where: { id: post.id },
        data: {
            title,
            content,
            imageUrl: url,
        },
    })

    // 4) Redirect back to dashboard (or anywhere you like)
    revalidatePath("/")
    return redirect("/dashboard")
}