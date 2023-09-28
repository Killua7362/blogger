'use client'

import BlogItem from "@/components/blog-item";
import prismadb from "@/lib/prismadb";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { Posts } from "@prisma/client";

interface AllPostProps{
    posts : Posts[]
}

const AllPost = ({posts}:{posts:AllPostProps}) => {
    return (
        <div>
            <div className="text-6xl p-6 border-b-2 pb-10"> 
                All Posts
            </div>
            <div>
                {posts.map((post)=>(
                 <BlogItem initialData={post} key={post.id}/>
                ))}
            </div>
        </div>
      );
}
 
export default AllPost;