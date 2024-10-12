'use client'


import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { SessionProvider } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { IoMdLogIn, IoMdLogOut, IoIosList, IoMdInformationCircleOutline } from "react-icons/io";

const NavbarContent = () => {
const { data: session } = useSession();
const router = useRouter()

  return (
	<div>
    <nav className="fixed w-screen top-0 bg-opacity-30 backdrop-blur-md text-black p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="px-4 py-1 rounded-md text-xl letter-spacing-3 font-bold flex items-center hover:bg-slate-200">

          ZMO
        </Link>
        <div className='flex items-center space-x-1'>
          
          <Link href="/guestbook" className="px-4 py-1 border-solid border border-zinc-400 rounded-md hover:bg-slate-200 flex items-center">
            <IoIosList className='mr-2'/>
            방명록
          </Link>
          <Link href="/info" className="px-4 py-1  rounded-md hover:bg-slate-200 flex items-center">
          <IoMdInformationCircleOutline className="mr-1"/>
          정보
          </Link>

          {session ? (
            <div className='flex items-center space-x-4'>
              <span className="mr-4 ml-4 ">안녕하세요, <a className='shadow-md underline decoration-3 decoration-indigo-500 font-bold '>{session.user?.name}</a>님!</span>
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