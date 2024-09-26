import Link from "next/link";
import { getServerSession } from "next-auth";
import { sql } from "@vercel/postgres";
import { authOptions } from "../auth/[...nextauth]";
import Sticker from "../components/Sticker";

interface Message {
  id: number;
  content: string;
  user_name: string;
  created_at: string;
}

export default async function GuestBook() {
  const session = await getServerSession(authOptions);
  const { rows } = await sql`SELECT * FROM messages ORDER BY created_at DESC LIMIT 20`;
  const messages = rows as Message[];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-6xl font-bold mb-8">저 와씀니다</h1>
      {session ? (
        <form action="/api/message" method="POST" className="mb-6 w-full max-w-md">
          <textarea 
            name="content" 
            required 
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" 
            placeholder="멘트 받겠습니다."
          ></textarea>
          <button 
            type="submit"  
            className="mt-2 px-4 py-2 bg-white text-black border-2 border-yellow-200 rounded hover:bg-yellow-400 hover:text-black transition-colors"
          >
            메시지 남기기
          </button>
        </form>
      ) : (
        <p className="mb-6">ZMOsite 방명록에 메시지를 남기려면 로그인하세요.</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {messages.map((message) => (
          <Sticker
            key={message.id}
            content={message.content}
            userName={message.user_name}
            createdAt={message.created_at}
          />
        ))}
      </div>
      <Link href="/" className="px-6 py-3 bg-white text-black rounded-md hover:bg-gray-400 transition-colors">
        돌아갈란다..
      </Link>
    </div>
  );
}