import { Posts, Role } from "@prisma/client";
import { format } from 'date-fns';
import { useRouter } from "next/navigation";
import qs from "query-string";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "./ui/context-menu";
import { Button } from "./ui/button";
import axios from "axios";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import prismadb from "@/lib/prismadb";
import { useRecoilState } from "recoil";
import { admin } from "@/recoil/admin";
import TitleEditForm from "@/app/(posts)/components/title-edit-form";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import Link from "next/link";

const Item = ({initialData}:{initialData:Posts})=>{
    const router = useRouter()
    return(
            <div className="flex flex-col pt-8" role="button" onClick={()=>{
                const url = qs.stringifyUrl({
                    url:'/posts/postId',
                    query:{id:initialData.id}
                })
                router.push(url)
            }} >
                <div className="text-xs">
                    {format(initialData.createdAt,'dd/MM/yyyy')}
                </div>
                <div className="text-4xl pt-1">
                    {String( initialData.title ).toUpperCase()}
                </div>
                <div className="pt-2 leading-6 text-secondary-foreground/60 text-lg">
                    {initialData.description}
                </div>
            </div>
    )
}

const BlogItem = ({initialData}:{initialData:Posts}) => {
    const router = useRouter()
    const {data:session} = useSession()
    const [adminState,setAdminState] =useRecoilState(admin)

    const contextDeleteHandler = async()=>{
        const id = initialData.id
        await axios.delete(`/api/posts/${id}`)
        router.refresh()
    }
    const contextEditHandler = async()=>{

    }

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
    },[session,setAdminState])
    if(adminState){
        return (
            <div onContextMenu={(e)=>e.preventDefault()}>
                <ContextMenu modal={false}>
                    <ContextMenuTrigger>
                        <Item initialData={initialData}/>
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                        <TitleEditForm initialData={initialData} buttonType={'text'}/>
                        <ContextMenuItem>
                            <Button variant='ghost' size="sm" onClick={contextDeleteHandler}>Delete</Button>
                        </ContextMenuItem>
                    </ContextMenuContent>
                </ContextMenu>
            </div>
          );
    }else{
        return(
            <Item initialData={initialData}/>
        )
    }
}
 
export default BlogItem;