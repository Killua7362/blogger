import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
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

let titleList = []

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



const CreatePost = () => {
    const [opendDialog,setOpenDialog] = useState(false)
    var form = useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            title:"",
            description:"",
        }
    })

    const onSubmit =async(formValues:z.infer<typeof formSchema>)=>{
        let values= {article:"",...formValues}
        await axios.post(`/api/posts`,values)
        setOpenDialog(false)
        router.refresh()
    }

    useEffect(()=>{
        const fetchTitle=async()=>{
            const titles = await axios.get(`/api/posts`)
            titleList=titles.data
        }
        fetchTitle()
    },[])

 const router = useRouter()   
    return (
            <Dialog onOpenChange={setOpenDialog} open={opendDialog} defaultOpen>
                <DialogTrigger asChild>
                    <DropdownMenuItem onSelect={(e)=>e.preventDefault()}>
                        <Button variant='ghost' size='base' onClick={()=>setOpenDialog(true)}>New Post</Button>
                    </DropdownMenuItem>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Create a new post
                        </DialogTitle>
                        <DialogDescription>
                            Type your new post&apos;os name and description and click on submit
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
 
export default CreatePost;