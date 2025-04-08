import { NextRequest, NextResponse } from "next/server";

import { getToken } from "next-auth/jwt"
import { ROLE } from "./utils/types/roles";
import { jwtDecode } from "jwt-decode";



export default async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  // const signInURL = new URL('/login', request.url);
  // const dashboardURL = new URL('/dashboard', request.url);
  // if (!token && request.nextUrl.pathname !== '/login' && request.nextUrl.pathname !== '/register' && request.nextUrl.pathname !== '/accountRecovery') {
  //   return NextResponse.redirect(signInURL);
  // }

  // if (token) {
  //   return NextResponse.redirect(dashboardURL);
  // } 
  
  
}

export const config = {
  matcher: ['/', '/login', '/home', '/dashboard','/register','/accountRecovery']
}