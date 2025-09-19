import {NextResponse} from 'next/server';

export async function GET(req: Request) {
    console.log("req.headers", req.headers);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
        headers: req.headers,
    });
    const data = await res.json();
    return NextResponse.json(data);
}
