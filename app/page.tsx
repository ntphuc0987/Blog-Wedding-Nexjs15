import { prisma } from "@/app/utils/db";
import BlogPostCard from "@/components/general/BlogPostCard";
import { SkeletonCard } from "@/components/general/Skeleton";
import { Suspense } from "react";


const getData = async () => {

  await new Promise((resolve) => setTimeout(resolve, 2000))

  const data = await prisma.blogPost.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      imageUrl: true,
      authorId: true,
      authorName: true,
      authorImage: true,
      createdAt: true,
      updatedAt: true,
    }
  })
  return data;
}

export default function Home() {

  //const data = await getData();

  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold tracking-tigh mb-8">Latest posts</h1>

      {/* Lay out */}
      <Suspense fallback={<SkeletonCard /> }>
        <BlogPosts />
      </Suspense>
    </div>
  );

}


const BlogPosts = async () => {
  const data = await getData();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((item: any) => (
        <BlogPostCard data={item} key={item.id} />
      ))}
    </div>
  )
}