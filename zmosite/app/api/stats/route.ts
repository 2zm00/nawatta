import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth/next"
import { sql } from '@vercel/postgres'
import { authOptions } from '@/lib/auth'

export async function GET(_request: Request) {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: "관리자 권한이 필요합니다." }, { status: 403 })
  }

  try {
    const [messageStats, userStats] = await Promise.all([
      sql`
        SELECT 
          COUNT(*) AS total_messages,
          AVG(LENGTH(content)) AS avg_message_length
        FROM messages
      `,
      sql`
        SELECT COUNT(*) AS total_users
        FROM users
      `
    ])

    const stats = {
      totalMessages: messageStats.rows[0].total_messages,
      avgMessageLength: Math.round(messageStats.rows[0].avg_message_length),
      totalUsers: userStats.rows[0].total_users
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error("통계 조회 중 오류 발생:", error)
    return NextResponse.json({ error: "통계 조회에 실패했습니다." }, { status: 500 })
  }
}