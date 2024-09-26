'use client'

import Link from 'next/link'
import { SessionProvider } from "next-auth/react"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-6xl font-bold mb-8">나 와따..!</h1>
      <p className="text-xl mb-8">저 와씀니다.</p>
      <Link href="/guestbook" className="px-6 py-3 bg-white text-black rounded-md hover:bg-gray-400 transition-colors">
        말하러가기
      </Link>
      <SessionProvider>
        {/* 여기에 필요한 컴포넌트를 넣으세요 */}
      </SessionProvider>
    </div>
  )
}