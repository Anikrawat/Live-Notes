import { documentTable } from "@/db/schema";
import { drizzle } from "drizzle-orm/neon-http";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";

const db = drizzle(process.env.DATABASE_URL!)

export async function PATCH(request:Request,{params}:{params:Promise<{noteId:string}>}):Promise<NextResponse>{

    const user = await currentUser()

    if(!user){
        return NextResponse.json({
            success: false,
            message:'Please register first.'
        },{status:400})
    }
    try {
        const {title,description} = await request.json()
        const {noteId} = await params
    
        await db.update(documentTable).set({
            title,
            description
        }).where(eq(documentTable.id, Number(noteId)))
    
        return NextResponse.json({
            success:true,
            description:"Note updated successfully"
        },{status:200})
    } catch (error) {
        return NextResponse.json({
            success:false,
            description:'Internal server error.' + error
        },{status:500})
    }

}