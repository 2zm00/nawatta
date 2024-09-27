'use client'


import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { SessionProvider } from "next-auth/react"
import { useRouter } from 'next/navigation'

const NavbarContent = () => {
const { data: session } = useSession();
const router = useRouter()

  return (
	<div>
    <nav className="bg-opacity-30 backdrop-blur-md text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          나 와따!
        </Link>
        <div>
          <Link href="/guestbook" className="mr-4">
            멘트 주기
          </Link>
          {session ? (
            <>
              <span className="mr-4">안녕하세요, {session.user?.name}님!</span>
              <button onClick={() => signOut()} className="bg-red-300 hover:bg-red-600 px-3 py-1 rounded">
                로그아웃
              </button>
            </>
          ) : (
            <button onClick={() => router.push('/auth')} className="bg-green-300 hover:bg-green-600 px-3 py-1 rounded">
              로그인
            </button>
          )}
        </div>
      </div>
    </nav>
	<div className="h-px bg-gray-200"></div>
	</div>
	
  );
};

const Navbar = () => {
  return (
    <SessionProvider>
      <NavbarContent />
    </SessionProvider>
  );
};

export default Navbar;