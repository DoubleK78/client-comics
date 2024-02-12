import { NextRequest } from "next/server";
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
  // Step: Create and call the next-intl middleware (example)
  const config: any = {
    defaultLocale: 'vi',
    locales,
    localePrefix,
    pathnames
  };

  if (process.env?.ENVIRONMENT?.toLowerCase() !== 'local') {
    config.domains = [
      {
        domain: process.env.NEXT_VI_URL!,
        defaultLocale: 'vi',
        locales: ['vi']
      },
      {
        domain: process.env.NEXT_EN_URL!,
        defaultLocale: 'en',
        locales: ['en']
      }
    ];
  }

  const handleI18nRouting = createIntlMiddleware(config);
  const response = handleI18nRouting(request);
  return response;
}