'use client'

import { signIn, signOut, useSession } from 'next-auth/react'

export default function LoginButton() {
  const { data: session } = useSession()

  if (session) {
    return (
      <button onClick={() => signOut()} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
        로그아웃
      </button>
    )
  }
  return (
    <button onClick={() => signIn()} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
      로그인
    </button>
  )
}