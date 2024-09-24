'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import LoginButton from './LoginButton'
import DarkModeToggle from './DarkModeToggle'
import ProfileButton from './ProfileButton'
import SignupButton from './SignupButton'

export default function Sidebar() {
  const { data: session } = useSession()

  return (
    <div className="w-64 bg-gray-100 dark:bg-gray-800 h-full p-4 flex flex-col">
      <div className="text-2xl font-bold mb-8">ZMOsite</div>
      <nav className="space-y-4 flex-grow">
        <Link href="/" className="block hover:text-blue-600 transition-colors">홈</Link>
        <Link href="/guestbook" className="block hover:text-blue-600 transition-colors">방명록</Link>
        <Link href="/info" className="block hover:text-blue-600 transition-colors">정보</Link>
        {session?.user?.role === 'admin' && (
          <Link href="/admin" className="block hover:text-blue-600 transition-colors">관리자</Link>
        )}
      </nav>
      <div className="mt-auto space-y-4">
		<SignupButton />
        <LoginButton />
        <DarkModeToggle />
        <ProfileButton />
      </div>
    </div>
  )
}