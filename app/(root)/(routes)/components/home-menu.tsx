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
import axios from "axios";
import { Role } from "@prisma/client";

const HomeMenu = ({extraComponents}:{extraComponents:[]}) => {
    const {data:session} = useSession()
    const [adminState,setAdminState] =useRecoilState(admin)
    useEffect(()=>{
        if(session){
            const adminStateHandler =async ()=>{
                const role = await axios.get(`/api/users/${session.user?.email}`)
                if(role.data.role === Role.ADMIN){
                    setAdminState(true)
                }else{
                    setAdminState(false)
                }
            }
        adminStateHandler()
        }
    },[session])
    const signInHandler = async () =>{
        await signIn()
    }
    const signOutHandler = async()=>{
        setAdminState(false)
        await signOut()
    }

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
                                    <Button variant='ghost' size='base' onClick={signInHandler}>Sign In</Button>
                                </DropdownMenuItem>
                            </div>:
                            <div>
                                <DropdownMenuLabel className="text-base">
                                    <div className="flex" >
                                        <div className="pr-2 ">
                                            <Image src={session.user.image} width={20} height={20} className="pt-1" alt="profile pic"/>
                                        </div>
                                        <div className="pr-1"> 
                                            {String( session.user.name ).toUpperCase()}
                                        </div>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator/>
                                <DropdownMenuItem>
                                    <Button variant='ghost' size='base' onClick={signOutHandler}>Sign Out</Button>
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