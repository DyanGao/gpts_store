import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/app/layout/Header'
import Footer from '@/app/layout/Footer'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'GPTs Store',
  description: 'Discover Third-Party GPTS',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
