import { documentTable } from "@/db/schema";
import { currentUser } from '@clerk/nextjs/server'
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import { NextResponse } from "next/server";

const db = drizzle(process.env.DATABASE_URL!)

export async function GET(request:Request,{params}:{params:Promise<{noteId:string}>}):Promise<NextResponse>{

    const user = await currentUser()

    if (!user) {
        return NextResponse.json({
            success:false,
            description:'Please register yourself.'
        },{status:400})
    }

    try {

        const {noteId} = await params
        const document = await db.select({notepadState:documentTable.notepadState}).from(documentTable).where(eq(documentTable.id,Number(noteId)))

        return NextResponse.json({
            success:true,
            document:document
        },{status:200})


    } catch (error) {
        return NextResponse.json({
            success:false,
            description:'Internal Server error: '+error
        },{status:500})
    }

}