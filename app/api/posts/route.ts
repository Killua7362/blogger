import prismadb from "@/lib/prismadb";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server"

export const revalidate = 1;
export async function POST(req:NextRequest){
try {
    const session = await getToken({
        req,
        secret:process.env.NEXTAUTH_SECRET,
    })
    let admin=(session?.email || '') === process.env.NEXT_PUBLIC_ADMIN_MAIL
    if(!admin){
        return new NextResponse('UnAuthorized',{status:401})
    }
    
    const body = await req.json()
    const {title,description,article}= body
    if (!article){
        const article ="Hello world"
    }
    const post =await prismadb.posts.create({
        data:{
            title,
            description,
            article,
        }
    })
        return NextResponse.json(post);
} catch (error) {
    console.log('[post_POST]',error)
    return new NextResponse("Internal Error",{status:500})
}
}

export async function GET(req:NextRequest){
    try{
        const posts =await prismadb.posts.findMany({
            orderBy:{
                updatedAt:'desc'
            }
        })
        return NextResponse.json(posts)
    }catch(error){
    }
}