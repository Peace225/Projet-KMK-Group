import { auth } from "@/auth";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createIntlMiddleware(routing);

const ADMIN_PATTERN = /\/[a-z]{2}\/admin(?!\/login)/;

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect admin routes (except login)
  if (ADMIN_PATTERN.test(pathname)) {
    const session = await auth();
    if (!session) {
      const locale = pathname.split("/")[1] || "fr";
      const loginUrl = new URL(`/${locale}/admin/login`, req.url);
      loginUrl.searchParams.set("callbackUrl", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|favicon\\.ico|.*\\..*).*)"],
};