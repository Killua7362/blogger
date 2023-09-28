'use client'
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { admin } from "@/recoil/admin";
import { useRecoilState } from "recoil";
import axios from 'axios'
import { useRouter } from "next/navigation";
import CreatePost from "./create-post";

const AdminHomeMenu = () => {
    const router = useRouter()
    return (
        <>
            <CreatePost/>
        </>
      );
}
 
export default AdminHomeMenu;