'use client'

import React from 'react'
import { EditorContent,useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import ToolBar from "@/components/ToolBar";
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import Heading from '@tiptap/extension-heading'
import CodeBlock from '@tiptap/extension-code-block'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import {useDebouncedCallback} from "use-debounce";
import axios from "axios";


interface NoteEditorProps {
    noteId: string
}

const NoteEditor:React.FC<NoteEditorProps> = ({noteId}) => {

    const handleSave = useDebouncedCallback(async (content: string) => {
        try {
            await axios.patch(`/api/save-editor-state/${noteId}`, { editorState: content });
        } catch (error) {
            console.error("Error saving state:", error);
        }
    }, 800);


    const editor = useEditor({
        extensions: [
            Underline,
            Color.configure({ types: [TextStyle.name, ListItem.name] }),
            TextStyle,
            Heading.configure({
                levels:[1,2,3,4,5,6]
            }),
            CodeBlock,
            BulletList,
            OrderedList,
            StarterKit,
        ],
        content:"",
        editorProps:{
            attributes:{
                class: "min-h-[150px] h-[80vh] w-[70vw] bg-white cursor-text p-5 ring-offset-background focus-within:outline-none focus-within:ring-ring focus-within:ring-offset-2 prose prose-ul:pl-5 prose-ol:pl-5 prose-li:list-disc"
            }
        },

        onUpdate:({editor}) => {
            const editorState = editor.getJSON()
            handleSave(JSON.stringify(editorState))
        },
        immediatelyRender:false
    })

    if (!editor) return null

    return (
        <div className= "bg-white w-fit rounded-md h-[80vh] overflow-y-scroll" id='style-3'>
            <ToolBar editor={editor} noteId={noteId}/>
            <EditorContent editor={editor}/>
        </div>
    )
}
export default NoteEditor
