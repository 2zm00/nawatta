import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth/next"
import { query } from '@/lib/db';
import { authOptions } from '@/lib/auth'

interface Message {
  id: number;
  content: string;
  user_id: string;
  user_name: string;
  created_at: string;
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  
  if (!session || !session.user) {
    return NextResponse.json({ error: "인증되지 않은 사용자입니다." }, { status: 401 })
  }

  const userId = session.user.id
  const userName = session.user.name

  if (!userId || !userName) {
    console.error("불완전한 사용자 정보:", session.user)
    return NextResponse.json({ error: "사용자 정보가 불완전합니다." }, { status: 400 })
  }

  const formData = await request.formData()
  const content = formData.get('content')

  if (!content || typeof content !== 'string' || content.trim().length === 0) {
    return NextResponse.json({ error: "메시지 내용이 비어있습니다." }, { status: 400 })
  }

  try {
    await query(
      'INSERT INTO messages (content, user_id, user_name) VALUES (?, ?, ?)',
      [content, userId, userName]
    );
    return NextResponse.json({ message: "메시지가 성공적으로 작성되었습니다." }, { status: 201 })
  } catch (error: any) {
    console.error("메시지 작성 중 오류 발생:", error)
    if (error.code) console.error("Error code:", error.code)
    if (error.sqlMessage) console.error("SQL message:", error.sqlMessage)
    return NextResponse.json({ error: "메시지 작성에 실패했습니다." }, { status: 500 })
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const limit = parseInt(searchParams.get('limit') || '20', 10)
  const offset = parseInt(searchParams.get('offset') || '0', 10)

  try {
    const rows = await query<Message[]>(
      'SELECT * FROM messages ORDER BY created_at DESC LIMIT ? OFFSET ?',
      [limit, offset]
    );
    return NextResponse.json(rows)
  } catch (error: unknown) {
	console.error("메시지 작성 중 오류 발생:", error);
    return NextResponse.json({ error: "메시지 조회에 실패했습니다." }, { status: 500 })
  }
}