import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";
import { cache } from "react";

export const GET = cache(
     async (req:NextRequest,
        {params}:{params:{usersId:string}}
        )=>{
    try {
            const UserByMail = await prismadb.user.findUnique({
                where:{
                    email:params.usersId
                }
            })
            const UserByID = await prismadb.user.findUnique({
                where:{
                    id:params.usersId
                }
            })
            const User = UserByID === null? UserByMail:UserByID
            return NextResponse.json(User);
    } catch (error) {
        console.log('[USERS_GET]',error)
        return new NextResponse("Internal Error",{status:500})
    }
    }
) 