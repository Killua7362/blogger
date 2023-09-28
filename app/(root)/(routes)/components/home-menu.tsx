'use client'
import { useSession, signIn, signOut} from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { admin } from "@/recoil/admin";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreVerticalIcon } from "lucide-react";
import AdminHomeMenu from "./admin-home-menu";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const HomeMenu = ({extraComponents}:{extraComponents:[]}) => {
    const {data:session} = useSession()
    const [adminState,setAdminState] =useRecoilState(admin)
    useEffect(()=>{
        if(session){
            if (session.user.email === process.env.NEXT_PUBLIC_ADMIN_MAIL){
                setAdminState(true)
            }
            else{
                setAdminState(false)
            }
        }
    },[session])

    return (
        <div>
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost">
                            <MoreVerticalIcon/>
                            </Button> 
                    </DropdownMenuTrigger>
                    <DropdownMenuContent >
                        {session === undefined || session === null ? 
                            <div>
                                <DropdownMenuItem>
                                    <Button variant='ghost' size='base' onClick={signIn}>Sign In</Button>
                                </DropdownMenuItem>
                            </div>:
                            <div>
                                <DropdownMenuLabel className="text-base">
                                    <div className="flex" >
                                        <div className="pr-2 ">
                                            <Image src={session.user.image} width={20} height={20} className="pt-1"/>
                                        </div>
                                        <div className="pr-1"> 
                                            {String( session.user.name ).toUpperCase()}
                                        </div>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator/>
                                <DropdownMenuItem>
                                    <Button variant='ghost' size='base' onClick={signOut}>Sign Out</Button>
                                </DropdownMenuItem>
                                {adminState && <AdminHomeMenu/>}
                                {adminState && extraComponents !== null && extraComponents!== undefined?extraComponents.map((component)=>(
                                    component
                                )):
                                <div></div>
                                }
                            </div>
                        }
                    </DropdownMenuContent>                
                </DropdownMenu>
        </div>
      );
}
 
export default HomeMenu;