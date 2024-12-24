'use client'

import React from 'react'
import NoteEditor from '@/components/NoteEditor'

const EditorPage = ({params}: { params: Promise<{noteId:string}>}) => {

    const {noteId} = React.use(params)

  return (
    <div className='w-[100vw] flex justify-center mt-10'>
      <NoteEditor noteId={noteId} />
    </div>
  )
}

export default EditorPage