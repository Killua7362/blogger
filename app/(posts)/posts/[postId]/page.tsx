import { useState } from "react";
import Editor from "../../components/markdown-editor";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { useRouter,notFound} from "next/navigation";
import { Separator } from "@/components/ui/separator";
import CommentsPage from "./components/comments";
import axios from "axios";
import { useRecoilState } from "recoil";
import { admin } from "@/recoil/admin";
import { Posts } from "@prisma/client";
import EditorPage from "./components/EditorPage";

export interface EditorPageProps{
    id:string
}

const EditorBasePage = ({searchParams}:{searchParams:EditorPageProps}) => {
    return (
        <div>
            <EditorPage searchParams={searchParams}/>
        </div>
      );
}
 
export default EditorBasePage;