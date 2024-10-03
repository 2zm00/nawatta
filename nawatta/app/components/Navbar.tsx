'use client'


import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { SessionProvider } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { IoMdLogIn, IoMdLogOut } from "react-icons/io";

const NavbarContent = () => {
const { data: session } = useSession();
const router = useRouter()

  return (
	<div>
    <nav className="bg-opacity-30 backdrop-blur-md text-black p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl letter-spacing-3 font-bold flex items-center shadow-lg ">

          ZMO
        </Link>
        <div className='flex items-center space-x-4'>
          <Link href="/guestbook" className="flex items-center">
            방명록
          </Link>
          {session ? (
            <div className='flex items-center space-x-4'>
              <span className="mr-4 ">안녕하세요, <a className='shadow-md underline decoration-3 decoration-indigo-500 '>{session.user?.name}</a>님!</span>
              <button onClick={() => signOut()} className="bg-red-500 text-white shadow-lg shadow-red-500/50 hover:bg-red-300 px-3 py-1 rounded flex items-center opacity-80 font-thin ">
              <IoMdLogOut className="mr-2" />
                로그아웃
              </button>
            </div>
          ) : (
            <button onClick={() => router.push('/auth')} className="bg-white hover:bg-zinc-400 px-3 py-1 rounded flex items-center">
              <IoMdLogIn className='mr-2' />
              로그인
            </button>
          )}
        </div>
      </div>
    </nav>
	<div className="h-px bg-gray-500"></div>
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