import BlogItem from "@/components/blog-item";
import prismadb from "@/lib/prismadb";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import AllPost from "./components/all-posts";
import { SessionProvider } from "next-auth/react";
import { Posts } from "@prisma/client";


interface AllPostProps{
    posts : Posts[]
}

const BasePage = async () => {
    const posts:Posts[]=await prismadb.posts.findMany({
        orderBy:{
            updatedAt:'desc'
        }
    })
    return (
        <div>
            <AllPost posts={posts}/>
        </div>
      );
}
 
export default BasePage;