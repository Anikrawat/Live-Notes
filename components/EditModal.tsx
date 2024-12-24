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

interface notesType {
    title: string;
    description: string;
    noteId: number;
}

interface editModalProps {
    noteId: number;
    notes: notesType[];
    setNotes: (value: notesType[]) => void,
    setEditModal: (value: boolean) => void,
}

interface noteAttributesType {
    title:string;
    description:string;
}

const EditModal:React.FC<editModalProps> = ({noteId,notes,setNotes,setEditModal}) => {

    const {toast} = useToast();
    const [updating,setUpdating] = useState(false);
    const [noteAttributes, setNoteAttributes] = useState<noteAttributesType>({
        title:"",
        description:"",
    });

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        const {name,value} = e.target;

        setNoteAttributes({
            ...noteAttributes,
            [name]:value
        })

    }

    const updateNote = async (e:React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        try {
            setUpdating(true);
            const response = await axios.patch(`/api/change-note-name/${noteId}`,noteAttributes)
            setNotes([...notes.filter((note) => note.noteId !== noteId),{noteId,title:noteAttributes.title,description:noteAttributes.description}])
            toast({
                title: "Success",
                description: response.data.description,
            })
            setUpdating(false);
            setEditModal(false)
        } catch  {
            toast({
                title: "Failure",
                description: "Error Updating note",
                variant: 'destructive'
            })
        }
    }

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Edit Note</CardTitle>
                <CardDescription>Edit Your Note</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="title">New Title</Label>
                            <Input name = "title" id="title" placeholder="New Title of your Note" onChange={handleChange}/>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="description">New Description</Label>
                            <Input name = "description" id="description" placeholder="New Description of your Note" onChange={handleChange}/>
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setEditModal(false)}>Cancel</Button>
                <Button onClick={(e) => updateNote(e)}>{
                    updating ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Updating...</> : "Update"
                }</Button>
            </CardFooter>
        </Card>
    )
}

export default EditModal
