import { NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { hash } from 'bcrypt'

export async function POST(request: Request) {
  const { name, email, password } = await request.json()

  try {
    // 이메일 중복 체크
    const existingUsers = await query('SELECT * FROM users WHERE email = ?', [email]) as any[]
    if (existingUsers.length > 0) {
      return NextResponse.json({ error: "이미 사용 중인 이메일입니다." }, { status: 400 })
    }

    // 비밀번호 해싱
    const hashedPassword = await hash(password, 10)

    // 사용자 생성
    await query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    )

    return NextResponse.json({ message: "회원가입이 완료되었습니다." }, { status: 201 })
  } catch (error: unknown) {
  console.error('회원가입 중 오류 발생:', error);
    return NextResponse.json({ error: "회원가입에 실패했습니다." }, { status: 500 })
  }
}