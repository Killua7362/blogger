import prismadb from "@/lib/prismadb"
import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

export const revalidate = 0;
export async function POST(req:NextRequest){
    try {
        const session = await getToken({
            req,
            secret:process.env.NEXTAUTH_SECRET,
        })
        if(!session){
            return new NextResponse('Not Logged In',{status:401})
        }
        
        const body = await req.json()
        const {commentText,authorId,postId}= body
        const comment =await prismadb.comment.create({
            data:{
                comment:commentText,
                writtenBy:{
                    connect:{
                     id:authorId   
                    }
                },
                post:{
                    connect:{
                        id:postId
                    }
                }
            }
        })
            return NextResponse.json(comment);
    } catch (error) {
        console.log('[Comment_POST]',error)
        return new NextResponse("Internal Error",{status:500})
    }
    }
    