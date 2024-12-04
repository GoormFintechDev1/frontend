
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  if (url.pathname !== "/splash" && !request.cookies.get("visited")) {
    url.pathname = "/splash";
    return NextResponse.redirect(url);
  }

  if (url.pathname === "/splash") {
    const response = NextResponse.next();
    response.cookies.set("visited", "true",{ maxAge: undefined });
    return response;
  }

  return NextResponse.next();
}