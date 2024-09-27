import './globals.css'
import { Inter } from 'next/font/google'



const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ZMOsite - 인터랙티브 방명록',
  description: 'ZMOsite의 현대적이고 인터랙티브한 방명록 애플리케이션',
}

export default function RootLayout({
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
      </body>
    </html>
  )
}