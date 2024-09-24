'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    })

    if (response.ok) {
      router.push('/auth/signin')
    } else {
      // 에러 처리
      console.error('회원가입 실패')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg">
        <h3 className="text-2xl font-bold text-center mb-4">ZMOsite 회원가입</h3>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <div>
              <label className="block" htmlFor="name">이름</label>
              <input 
                type="text" 
                placeholder="이름"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="email">이메일</label>
              <input 
                type="email" 
                placeholder="이메일"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="password">비밀번호</label>
              <input 
                type="password" 
                placeholder="비밀번호"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-baseline justify-between">
              <button 
                className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900 transition-colors"
                type="submit"
              >
                회원가입
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}