import prismadb from "@/lib/prismadb";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server"

export async function PATCH(req:NextRequest,
    {params}:{params:{postId:string}}
    ){
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
    const {id,title,description,article,comments,createdAt,updatedAt}= body

    if(!params.postId){
        return new NextResponse('id is required',{status:400})
    }

    const posts=await prismadb.posts.update({
        where:{
            id:params.postId,
        },
        data:{
            id,title,description,article,comments,createdAt,updatedAt
        }
    })
        return NextResponse.json(posts);
} catch (error) {
    console.log('[COMPANION_PATCH]',error)
    return new NextResponse("Internal Error",{status:500})
}
}

export async function DELETE(
    req:NextRequest,
    {params}:{params:{postId:string}}
){
    try{
        const session = await getToken({
            req,
            secret:process.env.NEXTAUTH_SECRET,
        })

        let admin=(session?.email || '') === process.env.NEXT_PUBLIC_ADMIN_MAIL
        if(!admin){
            return new NextResponse('UnAuthorized',{status:401})
        }
        const posts = await prismadb.posts.delete({
            where:{
                id:params.postId
            }
        })
        return NextResponse.json(posts);
    } catch (error) {
        console.log("[Post_DELETE",error)
        return new NextResponse('Internal Error',{status:500})
    }
}

export async function GET(
    req:NextRequest,
    {params}:{params:{postId:string}}
){
    try{
        const post = await prismadb.posts.findUnique({
            where:{
                id:params.postId
            },
            include:{
                comments:true
            }
        })
        return NextResponse.json(post);
    } catch (error) {
        console.log("[Post_DELETE",error)
        return new NextResponse('Internal Error',{status:500})
    }
}