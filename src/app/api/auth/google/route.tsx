import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export function GET(request: NextRequest){

    const token = request.nextUrl.searchParams.get("token");
    const user = request.nextUrl.searchParams.get("user");

    if (!token || ! user) return NextResponse.json({ message: "Invalid SSO Callback parameters" }, { status: 400 });

    try {
        
        const decodedUser = JSON.parse(Buffer.from(user, 'base64').toString('utf-8'));

        cookies().set("next-token", token, { maxAge: 60 * 60 });
        cookies().set("next-user", JSON.stringify(decodedUser), { maxAge: 60 * 60 });

        return NextResponse.redirect(new URL("/dashboard"));
    } catch (error) {
        console.error('Error handling SSO callback:', error);
        return NextResponse.json({ error: 'Failed to handle Google SSO callback.' }, { status: 500 });
    }
}