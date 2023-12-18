// Import CSS
import 'bootstrap/dist/css/bootstrap.min.css'
import './globals.css'
import '../public/assets/css/vendor/font-awesome.css'
import '../public/assets/css/vendor/slick.css'
import '../public/assets/css/vendor/slick-theme.css'
import '../public/assets/css/vendor/sal.css'
import '../public/assets/css/app.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className + " sticky-header"}>
        {/* Back To Top Start */}
        <a href="home-3.html#main-wrapper" id="backto-top" className="back-to-top">
          <i className="fas fa-angle-double-up" />
        </a>
        {/* Back To Top End */}
        {/* Main Wrapper Start */}
        <div className="main-wrapper" id="main-wrapper">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
      <Script src="/assets/js/vendor/jquery-3.6.0.min.js" />
      <Script src="bootstrap/dist/js/bootstrap.bundle.min.js" />
      <Script src="/assets/js/vendor/imagesloaded.pkgd.min.js" />
      <Script src="/assets/js/vendor/slick.min.js" />
      <Script src="/assets/js/vendor/jquery.countdown.min.js" />
      <Script src="/assets/js/vendor/jquery-appear.js" />
      <Script src="/assets/js/vendor/sal.js" />
      <Script src="/assets/js/app.js" />
    </html>
  )
}
