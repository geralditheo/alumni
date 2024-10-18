import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { getUserServer, getTokenServer } from '@/hooks/auth/authServer';

export function middleware(request: NextRequest) {

	const user = getUserServer();
	const token = getTokenServer();

	if (request.nextUrl.pathname.startsWith('/auth')){

		if (token && user) return NextResponse.redirect(new URL('/dashboard', request.url));
		
	}
  
	if (request.nextUrl.pathname.startsWith('/dashboard')){

		if (!token && !user) return NextResponse.redirect(new URL('/', request.url));

	}
  
  
  
}