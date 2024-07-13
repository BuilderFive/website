import { NextResponse } from "next/server";

let data = { record: {
    name: 'John Doe',
}}

export async function GET(request: Request) {
    return NextResponse.json({ 
        text: 'Hello',
        data,
        status: 200,
    });
}

export async function POST(request: Request) {
    const req = await request.json();

    data = req

    return NextResponse.json({ 
        message: 'Data updated',
        data,
        status: 200,
    });
}