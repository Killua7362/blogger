'use client'
import Editor from "@/app/(posts)/components/markdown-editor";
import { EditorPageProps } from "../page";
import { notFound } from "next/navigation";
import { NextResponse } from "next/server";
import axios from "axios";
import { useEffect, useState } from "react";
import { Posts } from "@prisma/client";
import { useRouter } from "next/navigation";

const EditorPage =({searchParams}:{searchParams:EditorPageProps}) => {
    const [post,setPost] = useState<Posts>()
    const router = useRouter()
    useEffect(()=>{
            const postData =async()=>{
                const result= await axios.get(`/api/posts/${searchParams.id}`).catch(err=>{
                    router.push('/404')
                }).then(
                    result=>{
                        setPost(result?.data)
                    }
                )
        }
        postData()
        })
    return (
        <div>
             {post !== undefined && <Editor initialEditing={post?.article === ""? true : false} initialData={post} searchParamsId={searchParams.id}/>}
        </div>
      );
}
 
export default EditorPage;