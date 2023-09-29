import NavBar from "@/components/navbar"
import AdminPostMenu from "../components/admin-post-menu"

const BaseLayout = (
    {children}:{children:React.ReactNode}
) =>{
    return(
        <div className="h-full">
            <NavBar extraComponents={[
                <AdminPostMenu key='adminPostMenu'/>
            ]}/>
            <div className="pt-20 h-full px-5 xl:px-96">
                {children}
            </div>
        </div>
    )
}
export default BaseLayout