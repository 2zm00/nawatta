'use client'

import Link from 'next/link'

export default function SignupButton({ className = '' }) {
  return (
    <Link href="/auth/signup" className={`px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors ${className}`}>
      회원가입
    </Link>
  )
}