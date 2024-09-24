import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-6xl font-bold mb-8">ZMOsite에 오신 것을 환영합니다</h1>
      <p className="text-xl mb-8">인터랙티브한 방명록 경험을 즐겨보세요</p>
      <Link href="/guestbook" className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
        방명록 보기
      </Link>
    </div>
  )
}