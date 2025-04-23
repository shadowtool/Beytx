import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextResponse } from "next/server";

const nextIntlMiddleware = createMiddleware(routing);

export default function middleware(request) {
  // Run next-intl's middleware first
  const response = nextIntlMiddleware(request);

  if (response) {
    const pathname = request.nextUrl.pathname;

    // Extract locale from URL path
    const locale = pathname.split("/")[1];

    // Set helpful headers (optional for debugging)
    response.headers.set("x-locale", locale);
    response.headers.set("x-pathname", pathname);

    // ✅ Set 'lang' cookie so app/layout.tsx can read it
    response.cookies.set("lang", locale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });

    return response;
  }

  return NextResponse.next();
}

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(ar|en)/:path*"],
};
