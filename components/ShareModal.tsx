"use client"

import * as React from "react";

import { useToast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Loader2 } from 'lucide-react'
import {useState} from "react";
import { Clipboard } from 'lucide-react';



interface editModalProps {
    noteId: number;
    setShareModal:(value:boolean) => void;
}


const EditModal:React.FC<editModalProps> = ({noteId,setShareModal}) => {

    const {toast} = useToast();
    const [copying,setCopying] = useState(false);
    const baseURL = `${window.location.protocol}//${window.location.host}`;
    const profileURL = `${baseURL}/notes/${noteId}adsfasdfasdfasfsfasfasfdadf`;


    const copyingUrl =(e:React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        setCopying(true);
        navigator.clipboard.writeText(profileURL)
        toast({
            title:'URL Copied',
            description:'Profile URL has been copied to clipboard'
        })
        setCopying(false)
    }

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Share This URL For Real-Time Collaboration.</CardTitle>
            </CardHeader>
            <CardContent className='flex gap-x-2'>
                <div className='w-[250px] flex items-center p-1.5 bg-amber-100 rounded text-md overflow-hidden'>
                <p>{profileURL}</p>
                </div>
                <Button className='bg-[#FF6500] hover:bg-[#FF4000]' onClick={(e) => copyingUrl(e)}>{
                    copying ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Copying...</> : <><Clipboard/></>
                }</Button>

            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setShareModal(false)}>Cancel</Button>
            </CardFooter>
        </Card>
    )
}

export default EditModal
