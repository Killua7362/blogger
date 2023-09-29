import { useState } from "react";
import Editor from "../../components/markdown-editor";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { useRouter,notFound} from "next/navigation";
import { Separator } from "@/components/ui/separator";
import CommentsPage from "./components/comments";

interface EditorPageProps{
    searchParams:{
        id:string
    }
}

const EditorPage = async ({searchParams}:{searchParams:EditorPageProps}) => {
    const post = await prismadb.posts.findUniqueOrThrow({
        where:{
            id:searchParams.id
        }
    }).catch(error=>{
        notFound()
        new NextResponse('Post does not exist',{status:404})
    })
    return(
        <div>
            <Editor initialEditing={post?.article === ""?true:false} initialData={post}/>
            <CommentsPage searchParamsId={searchParams.id}/>
        </div>
    ) 
}
 
export default EditorPage;