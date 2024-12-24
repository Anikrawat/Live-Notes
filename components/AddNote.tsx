"use client"

import * as React from "react";

import { useToast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios";
import { Loader2 } from 'lucide-react'
import {useState} from "react";
import {useRouter} from "next/navigation";

interface AddNoteProps{
    setIsAdding:(value: boolean) => void
}

const AddNote:React.FC<AddNoteProps> = ({setIsAdding}) => {

    interface noteAttributesType{
        title:string,
        description:string,
    }

    const {toast} = useToast();
    const router = useRouter();

    const [isLoading,setIsLoading] = useState<boolean>(false)
    const [noteAttribute, setNoteAttribute] = React.useState<noteAttributesType>({
        title:"",
        description:""
    })

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name,value} = e.target;
        setNoteAttribute({
            ...noteAttribute,
            [name]:value
        })
    }

    const createNote = async () => {
        try {
            setIsLoading(true)
            const response = await axios.post("/api/create-note", noteAttribute)
            console.log(response)
            const {noteId} = response.data.document[0]
            router.push(`/notes/${noteId}`)
            toast({
                title:"success",
                description:response.data.description,
                variant:'default'
            })
            setIsAdding(false)
            setIsLoading(false)
            setNoteAttribute({
                title:"",
                description:""
            })
        } catch {
            toast({
                title:"Failure",
                description:"Error creating note",
                variant:'destructive'
            })
        }
    }


  return (
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create Note</CardTitle>
          <CardDescription>Deploy your new Note in one-click.</CardDescription>
        </CardHeader>
        <CardContent>
            <form>
                <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="title">Title</Label>
                        <Input name = "title" id="title" placeholder="Title of your Note" onChange={handleChange}/>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="description">Description</Label>
                        <Input name = "description" id="description" placeholder="Description of your Note" onChange={handleChange}/>
                    </div>
                </div>
            </form>
        </CardContent>
          <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
              <Button onClick={createNote}>{
                  isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please Wait...</> : "Create"
              }</Button>
          </CardFooter>
      </Card>
  )
}

export default AddNote
