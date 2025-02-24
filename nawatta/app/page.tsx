'use client'
import MainLayout from '@/components/common/MainLayout'
import './globals.css'
import { SessionProvider } from "next-auth/react"




export default function Home() {
  return (
    <SessionProvider>
      <MainLayout/>
    </SessionProvider>
  )
}