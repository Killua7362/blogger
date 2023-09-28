import prismadb from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req:NextRequest,
    {params}:{params:{usersId:string}}
    ){
try {
        const user = await prismadb.user.findUnique({
            where:{
                email:params.usersId
            }
        })
        return NextResponse.json(user);
} catch (error) {
    console.log('[COMPANION_PATCH]',error)
    return new NextResponse("Internal Error",{status:500})
}
}
