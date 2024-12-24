"use client";

import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import emptyNote from '@/public/images/doc.svg'
import Addbutton from "@/components/Addbutton";
import { Button } from "@/components/ui/button"
import AddNote from "@/components/AddNote";
import { Trash2 } from 'lucide-react';
import { Pencil } from 'lucide-react';
import {useRouter} from "next/navigation";
import DeleteModal from "@/components/DeleteModal";
import EditModal from "@/components/EditModal";
import { Share2 } from 'lucide-react';
import ShareModal from "@/components/ShareModal";

const Dashboard = () => {

  interface Note {
    noteId:number;
    title: string;
    description: string;
  }

  const router = useRouter();
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [shareModal, setShareModal] = useState<boolean>(false);


  const fetchDocument = useCallback(async () => {
    try {
      const response = await axios.get("/api/get-notes");
      setNotes(response.data.document);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchDocument();
  }, [fetchDocument]);

  const handleLink = (noteId:number) => {
    router.push(`/notes/${noteId}`);
  }


  return (
    <main className="w-full h-full flex justify-center">
      {isAdding && 
      <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
        <AddNote setIsAdding={setIsAdding} />
      </div>}

        {
          notes.length > 0 ?
            (<div className="grid gap-y-6 grid-cols-2 mt-10 p-2 w-[40vw] text-white">
              <div className='text-3xl justify-self-start mb-4'>
                <h1>All Documents</h1>
              </div>
                  <div className='justify-self-end mb-4'>
                    <Addbutton setIsAdding={setIsAdding} isAdding={isAdding}/>
                  </div>

                  {
                    notes.map((note) => (
                        <div onClick={() => handleLink(note.noteId)} className="grid grid-cols-2 items-center col-span-2 w-full h-[12vh] rounded-md bg-[#1E3E62]  hover:bg-[#1E3E55]" key={note.noteId}>

                          {deleteModal &&
                        <div onClick={(e) => e.stopPropagation()} className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
                          <DeleteModal notes = {notes} setNotes = {setNotes} setDeleteModal = {setDeleteModal} noteId = {note.noteId}/>
                        </div>}

                          {editModal &&
                        <div onClick={(e) => e.stopPropagation()} className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
                          <EditModal notes = {notes} setNotes = {setNotes} setEditModal = {setEditModal} noteId = {note.noteId}/>
                        </div>}

                          {shareModal &&
                              <div onClick={(e) => e.stopPropagation()} className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
                                <ShareModal  setShareModal = {setShareModal} noteId = {note.noteId}/>
                              </div>}


                          <div className="flex items-center gap-x-5">
                          <div className="ml-7 w-[3.5vw] h-[3.5vw] bg-[#0A3981] flex items-center justify-center rounded">
                            <Image
                                src={emptyNote}
                                alt = 'Document'
                                width={50}
                                height={50}
                            />
                          </div>
                          <div className="flex flex-col">
                          <h1 className="line-clamp-1 text-xl">{note.title}</h1>
                          <p className="text-sm font-light text-blue-100">{note.description}</p>
                        </div>
                          </div>
                          <div className="justify-self-end mr-3 space-x-2">
                            <Button className="bg-green-600 hover:bg-green-700" onClick={(e) => {
                              e.stopPropagation();
                              setShareModal(true)
                            }}>
                              <Share2/> Share
                            </Button>
                            <Button onClick={(e) => {
                              e.stopPropagation()
                              setEditModal(true)
                            }}>
                              <Pencil/> Edit
                            </Button>
                            <Button className="bg-red-600 hover:bg-red-700" onClick={(e) => {
                              e.stopPropagation();
                              setDeleteModal(true)
                            }}>
                              <Trash2/> Delete
                            </Button>
                          </div>
                        </div>
                    ))
                  }
                </div>
            ) : (
                <div className="flex flex-col gap-2 w-[40vw] mt-10 bg-[#1E3E62] items-center rounded ">
                        <div className="flex flex-col w-fit items-center p-10 gap-5">
                          <Image
                          src={emptyNote}
                          alt = 'Document'
                          width={60}
                          height={60}
                          />
                          <Addbutton setIsAdding={setIsAdding} isAdding={isAdding}/>
                        </div>

                </div>
            )

        }


    </main>
  );
};

export default Dashboard;
