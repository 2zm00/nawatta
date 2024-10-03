'use client'
import './globals.css'
import Link from 'next/link'
import { SessionProvider } from "next-auth/react"
import { Children } from 'react'



export default function Home() {
  return (
    <SessionProvider>
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-6xl font-bold mb-8">
        나 와따..!
        </h1>
      <p className="text-xl mb-8">
        저 와씀니다.
        </p>
      <Link href="/guestbook" className="mb-8 px-6 py-2 bg-blue-500 shadow-blue-500/50 shadow-lg  text-white rounded-md hover:bg-blue-400 transition-colors">
        말하러가기
      </Link> 
      <Link href="/info" className="mb-8 px-6 py-2 bg-cyan-500 text-white text-bold rounded-md hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/50"> 
        Info
      </Link>"
    </div>
    </SessionProvider>
  )
}