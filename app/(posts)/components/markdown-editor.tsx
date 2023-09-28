'use client'
import MDEditor from '@uiw/react-md-editor';
import type { ContextStore } from '@uiw/react-md-editor';
import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { edit } from '@/recoil/admin';
import axios from 'axios'
import { useRouter } from 'next/navigation';
import { Comment } from '.prisma/client';
import { useTheme } from 'next-themes';
import { Separator } from '@/components/ui/separator';
import { Pencil } from 'lucide-react';
import TitleEditForm from './title-edit-form';

type OnChange = (value?: string, event?: React.ChangeEvent<HTMLTextAreaElement>, state?: ContextStore) => void;

export interface EditorProps{
    id:string,
    title:string,
    description:string,
    article:string,
    comments:Comment[],
    createdAt:string,
    updatedAt:string,
}

const Editor = ({initialEditing,initialData}:{initialEditing:boolean,initialData:EditorProps}) => {
    const { theme,setTheme } = useTheme()
    const [isEditing,setIsEditing] = useRecoilState(edit)
    const [value, setValue] = useState(initialData.article);
    useEffect(()=>{
        setIsEditing(initialEditing)
    },[])
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
 
    if(isEditing){
    return (
            <div className="fixed left-10 right-10" data-color-mode={theme}>
                <div className='text-4xl'>
                    {initialData.title}
                </div>
                <Separator className='mb-4 mt-6'/>

                <div className="flex mb-3">
                        <Button variant='secondary' onClick={()=>{
                        setIsEditing(false)
                        onSubmit(value)
                    }}>
                        Submit
                        </Button>
                        <Button variant='secondary' className='ml-2' onClick={()=>{
                        setIsEditing(false)
                        router.refresh()
                    }}>
                        Cancel
                        </Button>
                </div>
                <MDEditor
                    value={value}
                    preview="live"
                    height='75vh'
                    onChange={onChange}
                />
            </div>
      );
    }
    else{
        return(         
        <div>
            <div className='text-4xl flex'>
                {initialData.title}
                <TitleEditForm initialData={initialData} />
            </div>
            <Separator className='mb-4 mt-6'/>
            <div data-color-mode={theme}>
                <MDEditor.Markdown source={value}/>
            </div> 
        </div> )

    }
}
 
export default Editor;