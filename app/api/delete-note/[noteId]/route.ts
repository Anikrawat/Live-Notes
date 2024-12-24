import { documentTable } from "@/db/schema";
import { drizzle } from "drizzle-orm/neon-http";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import {currentUser} from "@clerk/nextjs/server";

const db = drizzle(process.env.DATABASE_URL!)

export async function DELETE(request:Request,{params}:{params:Promise<{noteId:string}>}):Promise<NextResponse>{

    const user = await currentUser()

    if (!user) {
        return NextResponse.json({
            success:false,
            message:'Please sign In first.'
        },{status:400})
    }

    const {noteId} = await params

    try {
        await db.delete(documentTable).where(eq(documentTable.id,Number(noteId)))
    
        return NextResponse.json({
            success:true,
            description:'Note Deleted'
        },{status:200})
    } catch (error) {
        return NextResponse.json({
            success:true,
            description:'Internal server error' + error
        },{status:500})
    }

}