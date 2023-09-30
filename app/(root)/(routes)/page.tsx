import BlogItem from "@/components/blog-item";
import prismadb from "@/lib/prismadb";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import AllPost from "./components/all-posts";
import { SessionProvider } from "next-auth/react";
import { Posts } from "@prisma/client";
import axios from "axios";


const BasePage = async () => {
    return (
        <div>
            <AllPost/>
        </div>
      );
}
 
export default BasePage;