import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()
export async function GET(request: Request) {
    const ueqsia = await prisma.ueqsia.findMany()
    return NextResponse.json(ueqsia)
}

export async function POST(request: Request) {
    const json = await request.json()
    const created = await prisma.ueqsia.create({
        data: json
    })
    return new NextResponse(JSON.stringify(created), {status: 201})
}