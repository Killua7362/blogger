import { useState } from "react";
import Editor from "../../components/markdown-editor";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { useRouter,notFound} from "next/navigation";

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
    return <Editor initialEditing={post?.article === ""?true:false} initialData={post}/>
}
 
export default EditorPage;