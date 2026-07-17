import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

// The blog and the local-SEO landing pages (/creation-site-web-*) only
// exist in French — see content/blog and src/config/cities.ts. A stray
// link to /en/blog or /ar/creation-site-web-maroc (an old bookmark, a
// shared URL, a search engine that indexed it before this fix) should
// land the visitor on the real French page instead of a 404.
function isFrenchOnlyPath(pathname: string) {
  return pathname === "/blog" || pathname.startsWith("/blog/") || pathname.startsWith("/creation-site-web-");
}

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const match = pathname.match(/^\/(en|ar)(\/.*|$)/);

  if (match && isFrenchOnlyPath(match[2] || "/")) {
    const url = request.nextUrl.clone();
    url.pathname = match[2] || "/";
    return NextResponse.redirect(url);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
