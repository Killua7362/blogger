'use client'
import { useRecoilState } from "recoil";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/navigation";
import HomeMenu from "@/app/(root)/(routes)/components/home-menu";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

const NavBar = ({ extraComponents }:{extraComponents:JSX.Element[]}) => {
    const router = useRouter()
    const { theme, setTheme } = useTheme()
    return (
        <div className={cn(`fixed w-full z-50 flex justify-between items-center h-14 pt-8 group bg-background border-b border-primary/10 pb-8 px-5 xl:px-96`)}>
            <Link href='/'>
            <div className="flex text-2xl ml-0 xl:ml-6"
            >
                    <Image alt='logo' src='/blog_logo.png' width={40} height={30} className="pr-3"/>
                    <div>
                        KILLUA&apos;S
                    </div>
                    <div className="pl-3">
                        BLOG
                    </div>
            </div>
                </Link>
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