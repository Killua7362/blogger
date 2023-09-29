'use client'
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Posts, User } from "@prisma/client";
import { AvatarFallback } from "@radix-ui/react-avatar";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { format } from 'date-fns';

interface CommentItemProps{
comment:string,
authorId:string,
writtenBy:User,
}

const CommentItem = ({postId,comment}:{postId:string,comment:CommentItemProps}) => {
    const [userData,setUserData] = useState(null)
    useEffect(()=>{
        const getUserInfo = async () =>{
            const user = await axios.get(`/api/users/${comment.authorId}`)
            setUserData(user.data)
        }
        getUserInfo()
    },[])
    return (
         <div className="py-2 my-2 w-full ">
            {userData !== null && 
                (
                    <div className="flex">
                        <Avatar className="mt-2 ml-2 w-12 h-12 items-center justify-center flex rounded-full">
                            <AvatarFallback className="rounded-full w-12 h-12 text-center border-2 border-muted-foreground" >
                                <div className="pt-2">
                                {String(userData.name).charAt(0)}
                                </div>
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col ml-4">
                            <div>
                                {userData.name}
                            </div>
                            <div className="text-xs pb-2">
                                {format(new Date( comment.createdAt ),'dd/MM/yyy' )}
                            </div>
                            <div>
                                {comment.comment}
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
      );
}
 
export default CommentItem;