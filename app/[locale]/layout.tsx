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

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('home'),
    description: t('home_description'),
    icons: {
      icon: '/assets/media/icon/head.ico',
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
        {/* Back To Top Start */}
        <a id="backto-top" className="back-to-top">
          <i className="fas fa-angle-double-up" />
        </a>
        {/* Back To Top End */}
        {/* Main Wrapper Start */}
        <div className="main-wrapper" id="main-wrapper">
          <NextIntlClientProvider messages={messages}>
            <Header />
            {children}
            <Footer />
          </NextIntlClientProvider>
        </div>
      </body>
      <Script src="/assets/js/vendor/jquery-3.6.0.min.js" />
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" />
      <Script src="/assets/js/vendor/imagesloaded.pkgd.min.js" />
      <Script src="/assets/js/vendor/sal.js" />
    </html>
  )
}
