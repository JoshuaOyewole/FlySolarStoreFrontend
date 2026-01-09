import { NextRequest, NextResponse } from "next/server";

export function proxy(request) {
  console.log("Middleware executed for:", request.nextUrl.pathname);
  
  const token = request.cookies.get("token")?.value;

  // If accessing admin routes without token, redirect to login
  if (!token) {
    console.log("No token found, redirecting to login");
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  console.log("Token found, allowing access");
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/vendor/:path*"], // Protect admin and vendor routes
};
