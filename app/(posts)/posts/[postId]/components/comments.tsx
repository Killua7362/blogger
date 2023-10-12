'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { SendHorizonalIcon } from "lucide-react";
import Image from "next/image";
import { cache, useEffect, useState } from "react";
import CommentItem from "./comment-item";
import { useRouter } from "next/navigation";
import { Posts, User } from "@prisma/client";

interface SessionProps{
   authorId:User,
   session:{
    picture:string
   }
}

const CommentsPage = ({searchParamsId}:{searchParamsId:string}) => {
    const [session,setSession] = useState<SessionProps>()
    const [inputcomment,setInputComment] = useState('')
    const [comments,setComments] = useState([])
    const [post,setPost] = useState<Posts>()
    const router = useRouter()
   const commentSendHandler = cache(
     async () =>{
            if(session && post){
                const values = {
                    commentText:inputcomment,
                    authorId:session.authorId.id,
                    postId:post.id
                }
                await axios.post(`/api/comment`,values)
                setInputComment('')
                router.refresh()
            }
            // console.log(inputcomment)
            // console.log(post.id)
            // console.log(session.authorId.id)
        }
   
   ) 
    useEffect(()=>{
        const allComments = cache(
             async()=>{
                const postData = await axios.get(`/api/posts/${searchParamsId}`)
                if(postData.data!==undefined){
                    setPost(postData.data)
                }
                if(postData.data.comments!==undefined){
                    setComments(
                        postData.data.comments.sort(function(a:Posts,b:Posts){
                            return new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
                        })
                    )
                }
            }
        )

        allComments()

        const sessionHandler = cache(
            async ()=>{
                const session = await axios.get(`/api/session/`)
                if(session?.data?.session?.picture !==undefined){
                    setSession(session.data)
                }
            }
        )
        sessionHandler()
    },[comments,post,searchParamsId])

    return (
        <div className="pb-80 pt-7">
            <div className="text-2xl">
                Comments
                <Separator/>
            </div>
            <div className="flex pt-3">
                <Image src={session === null || session === undefined? '/placeholder.png':session?.session?.picture!}
                  alt='testing'
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: '35px', height: '35px' }}
                  className="rounded-full"
                />
                <div className="flex w-full">
                    <Input className="w-full ml-4"
                    placeholder={session === null? 'Sign In to comment':'Type your comment'}
                    value={inputcomment}
                    onKeyDown={event=>{
                        if(event.key == 'Enter'){
                            commentSendHandler()
                        }
                    }}
                    onChange={(event)=>{
                        setInputComment(event.target.value || '')
                    }}
                    disabled={session===null || session===undefined}
                    />
                    <Button variant='ghost' type="submit" onClick={commentSendHandler} disabled={session===null || session===undefined}>
                        <SendHorizonalIcon/>
                    </Button>
                </div>
            </div>
            <div className="pt-4">
                {comments.map((item)=>(
                    <CommentItem key={searchParamsId} postId={searchParamsId} comment={item}/>
                ))}
            </div>
        </div>
      );
}
 
export default CommentsPage;