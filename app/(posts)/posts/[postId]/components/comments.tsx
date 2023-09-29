'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { SendHorizonalIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import CommentItem from "./comment-item";
import { useRouter } from "next/navigation";

interface CommentsPageProps{
    searchParamsId:string
}

let comments = []
let post = {}

const CommentsPage = ({searchParamsId}:{searchParamsId:CommentsPageProps}) => {
    const [session,setSession] = useState(null)
    const [inputcomment,setInputComment] = useState('')
    const router = useRouter()
   const commentSendHandler =async () =>{
        if(session && post){
            const values = {
                commentText:inputcomment,
                authorId:session.authorId.id,
                postId:post.id
            }
            await axios.post(`/api/comment`,values)
            router.refresh()
        }
        // console.log(inputcomment)
        // console.log(post.id)
        // console.log(session.authorId.id)
    }

    useEffect(()=>{

        const sessionHandler =async ()=>{
            const session = await axios.get(`/api/session/`)
            setSession(session.data)
        }

        sessionHandler()

        const allComments = async()=>{
            const postData = await axios.get(`/api/posts/${searchParamsId}`)
            post = postData.data ===undefined?{}:postData.data
            comments = postData.data.comments === undefined? []:postData.data.comments
        }
        allComments()
    },[session])

    return (
        <div className="pb-80 pt-7">
            <div className="text-2xl">
                Comments
                <Separator/>
            </div>
            <div className="flex pt-3">
                <Image src={session === null?'/placeholder.png':session.session.picture}
                  alt='testing'
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: '35px', height: '35px' }}
                  className="rounded-full"
                />
                <div className="flex w-full">
                    <Input className="w-full ml-4" onChange={(event)=>{
                        setInputComment(event.target.value || '')
                    }}/>
                    <Button variant='ghost' onClick={commentSendHandler}>
                        <SendHorizonalIcon/>
                    </Button>
                </div>
            </div>
            <div className="pt-4">
                {comments.map((item)=>(
                    <CommentItem postId={searchParamsId} comment={item}/>
                ))}
            </div>
        </div>
      );
}
 
export default CommentsPage;