import BlogItem from "@/components/blog-item";
import prismadb from "@/lib/prismadb";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import AllPost from "./components/all-posts";


const BasePage = async () => {
    const posts =await prismadb.posts.findMany({
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