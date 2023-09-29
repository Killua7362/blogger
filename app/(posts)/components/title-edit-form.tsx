import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"


import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { EditorProps } from "./markdown-editor";
import { ContextMenu, ContextMenuItem } from "@radix-ui/react-context-menu";


let titleList:string[] =[]

const formSchema = z.object({
    title: z.string().min(2,{
        message:"Username must be more than 2 chars"
    }).max(50).refine((data)=>!titleList.includes(data),{
        message:"Title must be unique"
    }),
    description: z.string().min(10,{
        message:"Description must be more than 10 chars"
    }).max(200),
  })

const buttonTypeDiv = (buttonType:string,setOpenDialog:any)=>{
    if(buttonType === 'icon'){
        return (<Button onClick={()=>setOpenDialog(false)} variant='ghost' size='icon'>
                        <Pencil className='h-5 w-5'/>
                    </Button>)
    }else{
        return (
                 <Button onClick={()=>setOpenDialog(false)} variant='ghost'  className="p-2">
                            Edit
                </Button>
                    )
    }
}
const TitleEditForm = ({initialData,buttonType}:{initialData:EditorProps,buttonType:string}) => {
    const [opendDialog,setOpenDialog] = useState(false)
    const router = useRouter()
    var form = useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            title:initialData.title,
            description:initialData.description,
        }
    })
    const onSubmit =async(formValues:z.infer<typeof formSchema>)=>{
        initialData.title = formValues.title
        initialData.description = formValues.description
        await axios.patch(`/api/posts/${initialData.id}`,initialData)
        // await axios.post(`/api/posts`,values)
        setOpenDialog(false)
        router.refresh()
    }
    return (
        <Dialog onOpenChange={setOpenDialog} open={opendDialog} defaultOpen>
                <DialogTrigger>
                    {buttonTypeDiv(buttonType,setOpenDialog)}
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Edit the Post
                        </DialogTitle>
                        <DialogDescription>
                            Type your new post&apos;s name and description and click on submit.
                            Click Escape if you want to cancel
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField control={form.control} name='title' render={
                                ({field})=>(
                                    <FormItem className="pb-2">
                                        <FormLabel>
                                            Title
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter the Post Title" {...field}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )
                            }/>
                            <FormField control={form.control} name='description' render={
                                ({field})=>(
                                    <FormItem className="pb-2">
                                        <FormLabel>
                                            Description
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter the Post description" {...field}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )
                            }/>
                            <Button type='submit'>Submit</Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
      );
}
 
export default TitleEditForm;
