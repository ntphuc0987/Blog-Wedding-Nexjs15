import { prisma } from "@/app/utils/db"
import BlogPostCard from "@/components/general/BlogPostCard"
import { buttonVariants } from "@/components/ui/button"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import Link from "next/link"


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

    const { getUser } = getKindeServerSession()
    const user = await getUser()

    if(!user) {
        return console.log("User not found")
    }
    const data = await getData(user.id);



    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-medium">Your Blog Articles</h2>
                <Link href={"/dashboard/create"} className={buttonVariants()}>
                    Create Post
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cold-2 lg:grid-cols-3 gap-4 mt-4">
                {data.map((item) => (
                    <BlogPostCard key={item.id} data={item} />
                ))}
            </div>
        </div>
    )
}

export default DashboardRoute