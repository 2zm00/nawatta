import type { Metadata } from "next";
import "./globals.css";
import Navbar from '@/app/components/Navbar'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/lib/auth";
import localFont from 'next/font/local'
import "../app/favicon.ico"

const Nanum = localFont({
  src: './fonts/NanumBG.ttf',
  display: 'swap',
})

const Noto = localFont({
  src: './fonts/NotoSans.ttf',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "나 와따!",
  description: "저 왔습니다.", 
  icons: "../app/favicon.ico",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="ko" className={Noto.className}>
      <body>
        <Navbar />
        <main className="container mx-auto mt-4">
          {children}
        </main>
      </body>
    </html>
  )
}