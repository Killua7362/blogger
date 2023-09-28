'use client'
import { useRecoilState } from "recoil";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { SessionProvider } from "next-auth/react";
import { admin } from "@/recoil/admin";
import { useRouter } from "next/navigation";
import HomeMenu from "@/app/(root)/(routes)/components/home-menu";

const NavBar = ({ extraComponents }:{extraComponents:[]}) => {
    const router = useRouter()
    return (
        <div className={ `fixed w-full z-50 flex justify-between items-center h-14 pt-8 group border-b border-primary/10 pb-8  px-5 xl:px-96 ` }>
            <div className="flex text-2xl " onClick={()=>{
                router.push('/')
            }}>
                <div>
                    KILLUA'S
                </div>
                <div className="pl-3">
                    BLOG
                </div>
            </div>
            <div className="flex">
                <SessionProvider>
                    <HomeMenu extraComponents={
                        extraComponents
                    }/>
                </SessionProvider>
                <ModeToggle/>
            </div>
        </div>
      );
}
 
export default NavBar;