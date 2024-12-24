import { documentTable } from "@/db/schema";
import { currentUser } from '@clerk/nextjs/server'
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import { NextResponse } from "next/server";

const db = drizzle(process.env.DATABASE_URL!)

export async function GET():Promise<NextResponse>{
    
    const user = await currentUser()

    if (!user) {
        return NextResponse.json({
            success:false,
            description:'Please register yourself.'
        },{status:400})
    }

    try {
        const userId = user.id;
        if (!userId) {
            throw new Error("User id is undefined");
        }
        const document = await db.select({noteId:documentTable.id,title:documentTable.title,description:documentTable.description}).from(documentTable).where(eq(documentTable.userId, userId as string))


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