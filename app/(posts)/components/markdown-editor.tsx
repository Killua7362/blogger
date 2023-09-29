'use client'
import MDEditor from '@uiw/react-md-editor';
import type { ContextStore } from '@uiw/react-md-editor';
import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { admin, edit } from '@/recoil/admin';
import axios from 'axios'
import { useRouter } from 'next/navigation';
import { Comment } from '.prisma/client';
import { useTheme } from 'next-themes';
import { Separator } from '@/components/ui/separator';
import { Pencil } from 'lucide-react';
import TitleEditForm from './title-edit-form';
import CommentsPage from '../posts/[postId]/components/comments';
import { Posts } from '@prisma/client';
import { EditorPageProps } from '../posts/[postId]/page';
type OnChange = (value?: string, event?: React.ChangeEvent<HTMLTextAreaElement>, state?: ContextStore) => void;


const Editor = ({initialEditing,initialData,searchParamsId}:{initialEditing:boolean,initialData:Posts,searchParamsId:string}) => {
    const { theme,setTheme } = useTheme()
    const [isEditing,setIsEditing] = useRecoilState(edit)
    const [adminState,setAdminState] =useRecoilState<boolean>(admin)

    const [value, setValue] = useState(initialData.article);
    useEffect(()=>{
        setIsEditing(initialEditing)
    },[setIsEditing,initialEditing])
    const onChange = useCallback<OnChange>((val) => {

        setValue(val || '');
      }, []);
      const router = useRouter()
    const onSubmit =async (value:string)=>{
        const values = {
            title:"testing",
            description:"description",
            article:value
        }
        if( initialData === null){
            await axios.post(`/api/posts`,values)
        }
        else{
            initialData.article = value
            await axios.patch(`/api/posts/${initialData.id}`,initialData)
        }
        router.refresh()
    }
 
    if(isEditing && adminState){
    return (
            <div className="fixed left-10 right-10" data-color-mode={theme}>
                <div className='text-4xl'>
                    {initialData.title}
                {adminState && <TitleEditForm initialData={initialData} buttonType='icon' />}
                </div>
                <Separator className='mb-4 mt-6'/>

                <MDEditor
                    value={value}
                    preview="live"
                    height='73vh'
                    onChange={onChange}
                />
                <div className="flex mt-3 w-full justify-end">
                        <Button variant='secondary' onClick={()=>{
                        setIsEditing(false)
                        onSubmit(value)
                    }}>
                        Submit
                        </Button>
                        <Button  variant='secondary' className='ml-2' onClick={()=>{
                        setIsEditing(false)
                        router.refresh()
                    }}>
                        Cancel
                        </Button>
                </div>
                <CommentsPage searchParamsId={searchParamsId}/>
            </div>
      );
    }
    else{
        return(         
        <div>
            <div className='text-4xl flex'>
                {initialData.title}
                {adminState && <TitleEditForm initialData={initialData} buttonType={'icon'} />}
            </div>
            <Separator className='mb-4 mt-6'/>
            <div data-color-mode={theme}>
                <MDEditor.Markdown source={value !==""?value:"This Post is not done yet".toUpperCase()}/>
            </div> 
            <CommentsPage searchParamsId={searchParamsId}/>
        </div> )

    }
}
 
export default Editor;