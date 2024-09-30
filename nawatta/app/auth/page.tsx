'use client'

import { signIn } from "next-auth/react"
import { useSearchParams } from 'next/navigation'
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { SiNaver, SiGoogle } from "react-icons/si";
import { RiKakaoTalkFill } from "react-icons/ri";

export default function AuthPage() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 space-y-4">
      <h1 className="text-4xl font-bold mb-6">로그인</h1>
      <button
        onClick={() => signIn('github', { redirect: true, callbackUrl: "/" })}
        className="flex bg-white p-1 items-center justify-center rounded-full hover:shadow-xl transition-shadow duration-300 ease-in-out py-2">
        
        <FaGithub className="flex items-center mr-2 space-x-4 text-2xl text-black" />
        깃허브 로그인 
      </button>

      <button 
      onClick={() => signIn('naver', {redirect: true, callbackUrl: "/"})}
      className = "flex bg-white p-1 items-center justify-center rounded-full hover:shadow-xl transition-shadow duration-300 ease-in-out py-2">
        <SiNaver className="flex items-center mr-2 space-x-4 text-2xl text-green-500"/>
        네이버 로그인        
      </button>
      <button 
      onClick={() => signIn('kakao', {redirect: true, callbackUrl: "/"})}
      className = "flex bg-white p-1 items-center justify-center rounded-full hover:shadow-xl transition-shadow duration-300 ease-in-out py-2">
        <RiKakaoTalkFill className="flex items-center mr-2 space-x-4 text-2xl text-amber-950"/> 
        카카오 로그인
      </button>
      <button 
      onClick={() => signIn('google', {redirect: true, callbackUrl: "/"})}
      className = "flex bg-white p-1 items-center justify-center rounded-full hover:shadow-xl transition-shadow duration-300 ease-in-out py-2">
        <FaGoogle className="flex items-center mr-2 space-x-4 text-2xl text-blue-600"/>
        구글 로그인
      </button>

    </div>
  )
}