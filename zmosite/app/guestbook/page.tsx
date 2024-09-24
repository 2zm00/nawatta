import { getServerSession } from "next-auth/next"
import { query } from '@/lib/db'
import PostIt from '@/components/PostIt'
import { authOptions } from '@/lib/auth'

interface Message {
  id: number;
  content: string;
  user_id: string;
  user_name: string;
  created_at: string;
}

export default async function Guestbook() {
  const session = await getServerSession(authOptions)
  const rows = await query('SELECT * FROM messages ORDER BY created_at DESC LIMIT 20') as Message[]

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">ZMOsite 방명록</h1>
      {session ? (
		<form action="/api/message" method="POST" className="mb-6">
  <textarea 
    name="content" 
    required 
    className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" 
    placeholder="ZMOsite에 대한 여러분의 생각을 남겨주세요!"
  ></textarea>
  <button 
    type="submit" 
    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
  >
    메시지 남기기
  </button>
</form>
      ) : (
        <p className="mb-6">ZMOsite 방명록에 메시지를 남기려면 로그인하세요.</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rows.map((message) => (
          <PostIt key={message.id} message={message} />
        ))}
      </div>
    </div>
  )
}