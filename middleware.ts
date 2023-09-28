import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt"
export { default } from "next-auth/middleware"
import { useRecoilState } from "recoil";
import { admin } from "@/recoil/admin";

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/_next") || // exclude Next.js internals
    pathname.startsWith("/static") || // exclude static files
    PUBLIC_FILE.test(pathname) // exclude all files in the public folder
    )
    return NextResponse.next();

  // do something else
  return NextResponse.next();
}