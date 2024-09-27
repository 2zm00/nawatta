'use client'

import { signIn } from "next-auth/react"
import { useSearchParams } from 'next/navigation'
import { FaGithub } from 'react-icons/fa';

export default function AuthPage() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-6">로그인</h1>
      <button
        onClick={() => signIn('github', { callbackUrl })}
        className="bg-white p-1 rounded-full hover:shadow-lg transition-shadow duration-300 ease-in-out">
        
        <FaGithub className="text-2xl text-black" />
      </button>
    </div>
  )
}