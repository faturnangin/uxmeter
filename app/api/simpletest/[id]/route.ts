import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "../../auth/[...nextauth]/route"
const prisma = new PrismaClient()


export async function GET(request: Request, {params} : {params:{id: string}}){
    const session = await getServerSession(authOptions);
    const id = params.id
    const simpletest = await prisma.simpletest.findUnique({
        where:{
            id: parseInt(id,10)
        }
    })
    return NextResponse.json({simpletest, name: session?.user?.name ?? "not logged in"})
}

export async function PUT(request:Request,
    {params} : {params : {id: string}}) {
    const id = params.id
    const json = await request.json()
    const updated = await prisma.simpletest.update({
        where:{
            id: parseInt(id)
        },
        // removing data if not sent
        // PUT replace all those property inside the json object, so it should be fullfiled, we set null so prisma wont allow incomplete update
        data : {
            title : json.title || null,
            post : json.post || null
        }
    })
    return NextResponse.json(updated)
}

export async function PATCH(request:Request,
    {params} : {params : {id: string}}) {
    const id = params.id
    const json = await request.json()
    const updated = await prisma.simpletest.update({
        where:{
            id: parseInt(id)
        },
        data : json
    })
    return NextResponse.json(updated)
}

export async function DELETE(request:Request, {params} : {params : {id:string}}) {
    const session = await getServerSession(authOptions)
    if(!session) {
        return new NextResponse(JSON.stringify({ error: 'unauthorized' }), {
        status: 401
        })
    }
    const id = params.id
    const deleted = await prisma.simpletest.delete({
        where:{
            id : parseInt(id)
        }
    })
    return NextResponse.json(deleted)
}