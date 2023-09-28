import prismadb from "@/lib/prismadb";
import { Role } from "@prisma/client";
import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID??"",
            clientSecret:process.env.GOOGLE_CLIENT_SECRET??""
        })
    ],
    callbacks:{
        async signIn({user,account,profile,email,credentials}){
            try {
             await prismadb.user.upsert({
                where:{
                    email:user.email
                },
                update:{
                },
                create:{
                    name:user.name,
                    email:user.email,
                    role: user.email === process.env.NEXT_PUBLIC_ADMIN_MAIL?Role.ADMIN:Role.USER
                }
            })
            } catch (error) {
              console.log(error)  
            }
            return true
        }
    }
})

export {handler as GET,handler as POST};