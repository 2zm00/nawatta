import { getServerSession } from "next-auth/next"
import { redirect } from 'next/navigation'
import { query } from '@/lib/db'
import { authOptions } from '@/lib/auth'

interface Message {
  id: number;
  content: string;
  created_at: Date;
}

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    redirect('/api/auth/signin')
  }

  const rows = await query<Message[]>(
    'SELECT * FROM messages WHERE user_id = ? ORDER BY created_at DESC LIMIT 10',
    [session.user.id]
  );


  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">내 프로필</h1>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">사용자 정보</h2>
        <p>이름: {session.user.name}</p>
        <p>이메일: {session.user.email}</p>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">내가 작성한 최근 메시지</h2>
        {rows.length > 0 ? (
          <ul className="space-y-4">
            {rows.map((message) => (
              <li key={message.id} className="bg-gray-100 p-4 rounded-lg">
                <p>{message.content}</p>
                <p className="text-sm text-gray-500 mt-2">
                  작성일: {new Date(message.created_at).toLocaleString('ko-KR')}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>아직 작성한 메시지가 없습니다.</p>
        )}
      </div>
    </div>
  )
}