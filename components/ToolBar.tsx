'use client'

import {FC, useCallback, useEffect} from 'react'
import {Button} from "@/components/ui/button";
import { Editor } from '@tiptap/react';
import { Bold, Italic, Underline,Strikethrough,List,ListOrdered,Code,Undo,Redo } from "lucide-react"
import axios from "axios";
import {pusherClient} from "@/lib/pusher";

interface ToolBarProps {
    editor:Editor|null;
    noteId:string;
}

const ToolBar:FC<ToolBarProps> = ({editor,noteId}) => {
    
    const fetchEditorState = useCallback(async () => {
        if (!editor) return
        try {
            const response = await axios.get(`/api/get-editor-state/${noteId}`)
            const editorState = response.data.document[0].notepadState
            editor.commands.setContent(JSON.parse(editorState))
        } catch (error:any){
            console.log(error)
        }
    },[])

    useEffect(() => {
        if (!editor) return
        fetchEditorState()
        pusherClient.subscribe(noteId)
        pusherClient.bind("saving-editor-state",(editorState:string) => {
            // console.log(editorState)
            editor.commands.setContent(editorState)
        })

        return () => {
            pusherClient.unsubscribe(noteId)
        }
    }, []);
    
    if (!editor) {
        return null
    }

    return (
        <div className="w-[70vw] flex justify-center mt-4">
            <div className="flex flex-wrap gap-2 w-fit mx-2">

                <Button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleBold()
                            .run()
                    }
                    className={`${editor.isActive('bold') ? 'bg-gray-300' : 'bg-white'} hover:bg-gray-300 shadow-none`}
                >
                    <Bold className="h-4 w-4 text-black" />
                </Button>

                <Button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleItalic()
                            .run()
                    }
                    className={`${editor.isActive('italic') ? 'bg-gray-300' : 'bg-white'} hover:bg-gray-300 shadow-none`}
                >
                    <Italic className="h-4 w-4 text-black" />
                </Button>
                <Button
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleUnderline()
                            .run()
                    }
                    className={`${editor.isActive('underline') ? 'bg-gray-300' : 'bg-white'} hover:bg-gray-300 shadow-none`}
                >
                    <Underline className="h-4 w-4 text-black" />
                </Button>
                <Button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleStrike()
                            .run()
                    }
                    className={`${editor.isActive('strike') ? 'bg-gray-300' : 'bg-white'} hover:bg-gray-300 shadow-none`}
                >
                    <Strikethrough className="h-4 w-4 text-black" />
                </Button>
                <Button
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    className={`${editor.isActive('codeBlock') ? 'bg-gray-300' : 'bg-white'} hover:bg-gray-300 shadow-none`}
                >
                    <Code className="h-4 w-4 text-black" />
                </Button>
                <Button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={`${editor.isActive('heading', { level: 1 }) ? 'is-active bg-gray-300' : 'bg-white'} hover:bg-gray-300 shadow-none text-black`}
                >
                    H1
                </Button>
                <Button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`${editor.isActive('heading', { level: 2 }) ? 'is-active bg-gray-300' : 'bg-white'} hover:bg-gray-300 shadow-none text-black`}
                >
                    H2
                </Button>
                <Button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={`${editor.isActive('heading', { level: 3 }) ? 'is-active bg-gray-300' : 'bg-white'} hover:bg-gray-300 shadow-none text-black`}
                >
                    H3
                </Button>
                <Button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                    className={`${editor.isActive('heading', { level: 4 }) ? 'is-active bg-gray-300' : 'bg-white'} hover:bg-gray-300 shadow-none text-black`}
                >
                    H4
                </Button>
                <Button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`${editor.isActive('bulletList') ? 'is-active bg-gray-300' : 'bg-white'} hover:bg-gray-300 shadow-none`}
                >
                    <List className="h-4 w-4 text-black"/>
                </Button>
                <Button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`${editor.isActive('orderedList') ? 'is-active bg-gray-300' : 'bg-white'} hover:bg-gray-300 shadow-none`}
                >
                    <ListOrdered className="h-4 w-4 text-black"/>
                </Button>
                <Button
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .undo()
                            .run()
                    }
                    className={`bg-white hover:bg-gray-300 shadow-none`}
                >
                    <Undo className="h-4 w-4 text-black"/>
                </Button>
                <Button
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .redo()
                            .run()
                    }
                    className={`bg-white hover:bg-gray-300 shadow-none`}
                >
                    <Redo className="h-4 w-4 text-black"/>
                </Button>
            </div>
        </div>
    )
}

export default ToolBar