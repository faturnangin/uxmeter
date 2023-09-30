import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()
export async function GET(request: Request) {
    const simpletest = await prisma.simpletest.findMany()
    return NextResponse.json(simpletest)
}

export async function POST(request: Request) {
    const json = await request.json()
    const created = await prisma.simpletest.create({
        data: json
    })
    return new NextResponse(JSON.stringify(created), {status: 201})
}