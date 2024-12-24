import { drizzle } from "drizzle-orm/neon-http";
import { documentTable } from "@/db/schema";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

const db = drizzle(process.env.DATABASE_URL!)

export async function POST(request:Request):Promise<NextResponse>{

    const user = await currentUser()

    const {title,description} = await request.json()

    if (!user) {
        return NextResponse.json({
            success:false,
            message:'Please sign In first.'
        },{status:400})
    }

    try {
        const document:typeof documentTable.$inferInsert = {
            title,
            description,
            userId:user.id,
        }

        const response = await db.insert(documentTable).values(document).returning({noteId:documentTable.id})
        
        return NextResponse.json({
            success:true,
            description:'Note Created successfully',
            document:response,
        },{status:200})

    } catch (error) {
        return NextResponse.json({
            success:false,
            description:'Internal Server error' + error
        },{status:500})
    }

}   