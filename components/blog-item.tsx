import { Posts } from "@prisma/client";
import { format } from 'date-fns';
import { useRouter } from "next/navigation";
import qs from "query-string";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "./ui/context-menu";
import { Button } from "./ui/button";
import axios from "axios";

interface BlogItemProps{
    initialData:Posts
}

const Item = ({initialData}:{initialData:BlogItemProps})=>{
    const router = useRouter()
    return(
            <div className="flex flex-col pt-8" onClick={()=>{
                const url = qs.stringifyUrl({
                    url:'/posts/postId',
                    query:{id:initialData.id}
                })
                router.push(url)
            }}>
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

const BlogItem = ({initialData}:{initialData:BlogItemProps}) => {
    const router = useRouter()
    const contextDeleteHandler = async()=>{
        const id = initialData.id
        await axios.delete(`/api/posts/${id}`)
        router.refresh()
    }
    return (
        <ContextMenu>
            <ContextMenuTrigger>
                <Item initialData={initialData}/>
            </ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuItem>
                    <Button variant='ghost' size='base'>Edit</Button>
                </ContextMenuItem>
                <ContextMenuItem>
                    <Button variant='ghost' size='base' onClick={contextDeleteHandler}>Delete</Button>
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
      );
}
 
export default BlogItem;