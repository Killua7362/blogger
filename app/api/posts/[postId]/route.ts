import prismadb from "@/lib/prismadb";
import { getToken } from "next-auth/jwt";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server"
import { cache } from "react";

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
    let posts
    if(comments.length<1){
        posts=await prismadb.posts.update({
            where:{
                id:params.postId,
            },
            data:{
                id,title,description,article,createdAt,updatedAt
            }
        })
    }else{
        posts=await prismadb.posts.update({
            where:{
                id:params.postId,
            },
            data:{
                ...body
            }
        })
    }
        revalidatePath(req.nextUrl.searchParams.get('path') || '/')
        revalidatePath('/api/posts')
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
        revalidatePath(req.nextUrl.searchParams.get('path') || '/')
        revalidatePath('/api/posts')
        return NextResponse.json(posts);
    } catch (error) {
        console.log("[Post_DELETE",error)
        return new NextResponse('Internal Error',{status:500})
    }
}

export const GET = cache(
     async (
        req:NextRequest,
        {params}:{params:{postId:string}}
    )=>{
        try{
            const post = await prismadb.posts.findUnique({
                where:{
                    id:params.postId
                },
                include:{
                    comments:true
                }
            })
            if(!post){
                return new NextResponse('Post does not exist',{status:404})
            }
            return NextResponse.json(post);
        } catch (error) {
            console.log("[Post_DELETE",error)
            return new NextResponse('Internal Error',{status:500})
        }
    }   
) 