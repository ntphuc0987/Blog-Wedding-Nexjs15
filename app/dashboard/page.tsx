import { prisma } from "@/app/utils/db"
import BlogPostCard from "@/components/general/BlogPostCard"
import { SkeletonCard } from "@/components/general/Skeleton"
import { buttonVariants } from "@/components/ui/button"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import Link from "next/link"
import { Suspense } from "react"


const getData = async (userId: string) => {
    const data = await prisma.blogPost.findMany({
        where: {
            authorId: userId,
        },
        orderBy: {
            createdAt: "desc",
        }
    })
    return data
}

const DashboardRoute = async () => {

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-medium">Your Blog Articles</h2>
                <Link href={"/dashboard/create"} className={buttonVariants()}>
                    Create Post
                </Link>
            </div>
            <Suspense fallback={<div className=""><SkeletonCard /></div>}>
                <div className="grid grid-cols-1 md:grid-cold-2 lg:grid-cols-3 gap-4 mt-4">
                    <BlogPosts />
                </div>
            </Suspense>
        </div>
    )
}

export default DashboardRoute

const BlogPosts = async () => {

    const { getUser } = getKindeServerSession()
    const user = await getUser()

    if (!user) {
        return <div>User not found</div>;
    }

    const data = await getData(user?.id);

    return (
        <>
            {data.map((item) => (
                <BlogPostCard key={item.id} data={item} />
            ))}
        </>
    )
}