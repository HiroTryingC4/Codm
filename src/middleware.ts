import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login") return NextResponse.next();

  const isApi = pathname.startsWith("/api");

  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  const authenticated = token ? await verifySessionToken(token) : false;

  if (authenticated) return NextResponse.next();

  if (isApi) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const loginUrl = new URL("/admin/login", request.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*", "/api/applicants/:path*", "/api/admin/accounts/:path*"],
};
