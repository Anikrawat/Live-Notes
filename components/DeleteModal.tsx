"use client"

import * as React from "react";

import { useToast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import axios from "axios";
import { Loader2 } from 'lucide-react'
import {useState} from "react";

interface notesType {
    title: string;
    description: string;
    noteId: number;
}

interface DeleteModalProps {
    noteId: number;
    notes: notesType[];
    setNotes: (value: notesType[]) => void,
    setDeleteModal: (value: boolean) => void,
}

const DeleteModal:React.FC<DeleteModalProps> = ({noteId,notes,setNotes,setDeleteModal}) => {

    const {toast} = useToast();
    const [deleting,setDeleting] = useState(false);

    const deleteNote = async (e:React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        try {
            setDeleting(true);
            await axios.delete(`/api/delete-note/${noteId}`);
            setNotes(notes.filter(note => note.noteId !== noteId))
            toast({
                title:'Success',
                description:"Successfully deleted note",
            })
            setDeleteModal(false)
            setDeleting(false)
        } catch {
            toast({
                title: "Failure",
                description: "Error deleting note",
                variant: 'destructive'
            })
        }
    }

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Delete Note</CardTitle>
                <CardDescription>Are you sure you want to delete this note.</CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setDeleteModal(false)}>Cancel</Button>
                <Button onClick={(e) => deleteNote(e)}>{
                    deleting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Deleting...</> : "Delete"
                }</Button>
            </CardFooter>
        </Card>
    )
}

export default DeleteModal
