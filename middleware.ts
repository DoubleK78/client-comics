import { NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from 'next-intl/middleware';
import { locales, localePrefix, pathnames } from './navigation';

export const config = {
  // Matcher entries are linked with a logical "or", therefore
  // if one of them matches, the middleware will be invoked.
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ]
};

export default async function middleware(request: NextRequest) {
  // Step: Determine default language when new visit page
  let locale = null;
  let localeDetection = true;
  let preventSwitchLocale = false;

  if (!request.cookies.has('NEXT_LOCALE')) {
    // Get path from request
    const { pathname } = request.nextUrl;
    locale = pathname.includes('/en') ? 'en' : 'vi';
    localeDetection = false;
    // Vietnamese is default can not change langauge by url
  } else if (request.cookies.get('NEXT_LOCALE')?.value === 'vi' && request.nextUrl.searchParams.get('switch') === 'true') {
    locale = 'en';
  } else if (request.cookies.get('NEXT_LOCALE')?.value === 'vi' && request.nextUrl.pathname.includes('/en')) {
    locale = 'vi';
    localeDetection = false;
    preventSwitchLocale = true;
  }

  // Step: Create and call the next-intl middleware (example)
  const handleI18nRouting = createIntlMiddleware({
    defaultLocale: 'vi',
    locales,
    localePrefix,
    pathnames,
    localeDetection
  });
  const response = handleI18nRouting(request);

  // Step: When user navigate new page based on url, save langauge to cookie
  if (locale) {
    response.cookies.set('NEXT_LOCALE', locale);

    if (preventSwitchLocale)
      return NextResponse.redirect(new URL(request.nextUrl.pathname.replace('/en', '/vi'), request.url));
  }

  // Checking Maintenance Mode
  if (process.env.MAINTENANCE_MODE?.toLowerCase() === 'true'
    && (!request.nextUrl.pathname.includes(pathnames['/maintenance'].vi)
    && !request.nextUrl.pathname.includes(pathnames['/maintenance'].en))) {
    return NextResponse.redirect(new URL('/maintenance', request.url));
  }

  return response;
}