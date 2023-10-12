import prismadb from "@/lib/prismadb";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server"
import { cache } from "react";

export const GET = cache(
    async (req:NextRequest)=>{
        try{
            const session = await getToken({
                req,
                secret:process.env.NEXTAUTH_SECRET,
            })
            const authorId = await prismadb.user.findUnique({
                where:{
                    email:session?.email!
                }
            })
            return NextResponse.json({ session,authorId })
        }catch(error){
            return NextResponse.json({})
        }
    }
) 