'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function ProfileButton() {
  const { data: session } = useSession()

  if (!session) {
    return null
  }

  return (
    <Link href="/profile" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
      프로필
    </Link>
  )
}