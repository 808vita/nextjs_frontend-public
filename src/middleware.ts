import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const pathname = req.nextUrl.pathname;
  // console.log(session);
  if (!session && pathname.startsWith("/admin")) {
    const url = new URL(`/login`, req.url);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}
