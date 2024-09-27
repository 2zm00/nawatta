import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/lib/auth";
import { redirect } from 'next/navigation';

type Message = {
	id: number;
	content: string;
	user_name: string | null;
	created_at: Date;
  };


// export async function POST(request: Request) {
//   const session = await getServerSession(authOptions);
  
//   if (!session || !session.user) {
//     return NextResponse.json({ error: "인증되지 않은 사용자입니다." }, { status: 401 });
//   }

//   try {
// 	const body = await request.json();
//     const { content } = await request.json();

// 	if (typeof content !== 'string' || content.length < 1 || content.length > 500) {
// 		return NextResponse.json({ error: "메시지 내용이 필요 합니다." }, { status: 400 });
// 	  }

//     const result = await sql<Message>`
//       INSERT INTO messages (content, user_name)
//       VALUES (${content}, ${session.user.name || ''}, ${session.user.email || ''})
//       RETURNING id, content, user_name, created_at;
//     `;

//     return NextResponse.json({ message: result.rows[0] }, { status: 201 });
//   } catch (error) {
//     console.error("메시지 저장 중 오류 발생:", error);
//     return NextResponse.json({ error: "메시지 저장에 실패했습니다." }, { status: 500 });
//   }
// }

export async function POST(request: Request) {
  console.log("POST 요청 시작");
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    console.log("인증되지 않은 사용자");
    return NextResponse.json({ error: "인증되지 않은 사용자입니다." }, { status: 401 });
  }

  try {
    const contentType = request.headers.get("content-type");
    let content;

    if (contentType?.includes("application/json")) {
      const body = await request.json();
      console.log("JSON 요청 본문:", body);
      content = body.content;
    } else {
      // application/x-www-form-urlencoded 또는 다른 형식의 경우
      const formData = await request.formData();
      content = formData.get("content");
      console.log("폼 데이터 요청 본문:", content);
    }

    if (typeof content !== 'string' || content.length < 1 || content.length > 500) {
      console.log("잘못된 메시지 내용:", content);
      return NextResponse.json({ error: "메시지 내용은 1자 이상 500자 이하여야 합니다." }, { status: 400 });
    }

    console.log("메시지 저장 시도:", content, session.user.name);

    const result = await sql<Message>`
      INSERT INTO messages (content, user_name)
      VALUES (${content}, ${session.user.name || ''})
      RETURNING id, content, user_name, created_at;
    `;

    console.log("SQL 실행 결과:", result);

    if (result.rows.length > 0) {
      return NextResponse.redirect(new URL('/guestbook', request.url), 303);
      } else {
		throw new Error("메시지가 저장되지 않았습니다.");
	  }
  } catch (error) {
    console.error("메시지 저장 중 오류 발생:", error);
    return NextResponse.json({ 
      error: "메시지 저장에 실패했습니다.", 
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}

export async function GET(request: Request) {
	try {
	  const { searchParams } = new URL(request.url);
	  const limit = Math.min(parseInt(searchParams.get('limit') || '100', 10), 100); // 최대 100개로 제한
	  const offset = Math.max(parseInt(searchParams.get('offset') || '0', 10), 0);

	  const messages = await sql<Message>`
      SELECT id, content, user_name, created_at
      FROM messages
      ORDER BY created_at DESC
      LIMIT ${limit}
      OFFSET ${offset};
    `;

    return NextResponse.json({ messages: messages.rows }, { status: 200 });
  } catch (error) {
    console.error("메시지 조회 중 오류 발생:", error);
    return NextResponse.json({ error: "메시지 조회에 실패했습니다." }, { status: 500 });
  }
}