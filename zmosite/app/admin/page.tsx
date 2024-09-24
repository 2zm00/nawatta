import { getServerSession } from "next-auth/next"
import { sql } from '@vercel/postgres'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'

interface StatRow {
  date: Date;
  message_count: string;
  user_count: string;
}

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'admin') {
    redirect('/')
  }

  const { rows: stats } = await sql<StatRow>`
    SELECT 
      DATE_TRUNC('day', created_at) AS date,
      COUNT(*) AS message_count,
      COUNT(DISTINCT user_id) AS user_count
    FROM messages
    GROUP BY DATE_TRUNC('day', created_at)
    ORDER BY date DESC
    LIMIT 7
  `

  const chartData = stats.map(row => ({
    date: row.date.toISOString().split('T')[0],
    메시지: parseInt(row.message_count),
    사용자: parseInt(row.user_count)
  })).reverse()

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">ZMOsite 관리자 대시보드</h1>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">최근 7일 통계</h2>
        <ul>
          {chartData.map((data, index) => (
            <li key={index}>
              {data.date}: 메시지 {data.메시지}, 사용자 {data.사용자}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}