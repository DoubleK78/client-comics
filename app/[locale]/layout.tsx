// Import CSS
import 'bootstrap/dist/css/bootstrap.min.css'
import './globals.css'
import '@/public/assets/css/vendor/font-awesome.css'
import '@/public/assets/css/vendor/slick.css'
import '@/public/assets/css/vendor/slick-theme.css'
import '@/public/assets/css/vendor/sal.css'
import '@/public/assets/css/app.css'
import '@/public/assets/css/flag-icon-css/css/flag-icons.min.css';
import { Inter } from 'next/font/google'
import Script from 'next/script'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { NextIntlClientProvider, useMessages } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import GoogleAnalytics from '../components/analytics/GoogleAnalytics'
import { Viewport } from 'next'

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  themeColor: '#111111'
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'metadata' });
  const baseUrl = process.env.NEXT_BASE_URL!;
  const imageOGUrl = locale === 'en' ? `${baseUrl}/assets/media/meta_home_image_en.png` : `${baseUrl}/assets/media/meta_home_image.png`;

  return {
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: '/',
      languages: {
        'vi': '/',
        'en': '/en',
      },
    },
    title: t('home'),
    description: t('home_description'),
    manifest: "/manifest.json",
    appleWebApp: {
      capable: true,
      statusBarStyle: "black-translucent",
      title: t('home'),
      startupImage: [
        '/splash_screens/iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_portrait.png',
        {
          url: '/splash_screens/iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_portrait.png',
          media: 'screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
        },
        {
          url: '/splash_screens/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_portrait.png',
          media: 'screen and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
        }
      ]
    },
    openGraph: {
      title: t('home'),
      description: t('home_description'),
      images: [
        {
          url: imageOGUrl,
          width: 800,
          height: 600
        }
      ]
    }
  };
}

export default function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode,
  params: any
}) {
  // Receive messages provided in `i18n.ts`
  const messages = useMessages();

  return (
    <html lang={locale} className='block-horizal'>
      <body className={inter.className + " sticky-header block-horizal"}>
        {process.env.googleAnalytics ? <GoogleAnalytics ga_id={process.env.googleAnalytics} /> : null}
        <div className="main-wrapper" id="main-wrapper">
          <NextIntlClientProvider messages={messages}>
            <Header />
            {children}
            <Footer />
          </NextIntlClientProvider>
        </div>
      </body>
      <Script src="/assets/js/vendor/jquery-3.6.0.min.js" strategy='lazyOnload' />
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" />
      {/* <Script src="/assets/js/vendor/imagesloaded.pkgd.min.js" /> */}
      <Script src="/assets/js/vendor/sal.js" strategy='lazyOnload' />
    </html>
  )
}
