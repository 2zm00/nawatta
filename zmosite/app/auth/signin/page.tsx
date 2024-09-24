'use client'

import { signIn } from 'next-auth/react'
import { useState, FormEvent } from 'react'
import SignupButton from '@/components/SignupButton'


export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    await signIn('credentials', { email, password, callbackUrl: '/' })
  }

  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg">
        <h3 className="text-2xl font-bold text-center mb-4">ZMOsite에 로그인</h3>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <div>
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
            <div className="flex justify-between items-center space-x-2 mt-4">
              <button 
                className="flex-1 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-900 transition-colors text-sm"
                type="submit"
              >
                로그인
              </button>
              <button 
                className="flex-1 px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-900 transition-colors text-sm"
                onClick={() => signIn('google')}
                type="button"
              >
                Google로 로그인
              </button>
              <SignupButton className="flex-1 text-sm" />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}