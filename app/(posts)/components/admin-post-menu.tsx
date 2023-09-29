'use client'
import { Button } from "@/components/ui/button";
import { DropdownMenuLabel,DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { edit } from "@/recoil/admin";
import axios from "axios";
import { useRouter, useSearchParams} from "next/navigation";
import { useRecoilState } from "recoil";


const AdminPostMenu = () => {
    const params = useSearchParams()
    const [isEditing,setIsEditing] = useRecoilState(edit)
    const router = useRouter()
    const deleteHandler =async ()=>{
        const id = params.get('id')
        axios.delete(`/api/posts/${id}`)
        router.push('/')
    }
    return ( 
        <>
            <DropdownMenuSeparator/>
            <DropdownMenuLabel>
                THIS POST
            </DropdownMenuLabel>
            <DropdownMenuSeparator/>
            <DropdownMenuItem>
                <Button variant='ghost' size="sm" onClick={()=>{setIsEditing(true)}}>Edit</Button>
            </DropdownMenuItem>
            <DropdownMenuItem>
                <Button variant='ghost' size="sm" onClick={()=>deleteHandler()}>Delete</Button>
            </DropdownMenuItem>
        </>
     );
}
 
export default AdminPostMenu;