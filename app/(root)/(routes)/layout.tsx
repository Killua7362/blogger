'use client'
import NavBar from "@/components/navbar"
import AdminHomeMenu from "./components/admin-home-menu"
const BaseLayout = (
    {children}:{children:React.ReactNode}
) =>{
    return(
        <div className="h-full">
            <NavBar extraComponents={[
            ]}/>
            <div className="pt-24 h-full px-5 xl:px-96 ">
                {children}
            </div>
        </div>
    )
}
export default BaseLayout