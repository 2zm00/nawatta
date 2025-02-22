import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/lib/auth";
import { connectToDatabase } from "@/app/lib/mongodb";

// MongoDB에서 사용하는 메시지 타입 (주의: _id는 ObjectId 타입이므로 문자열로 변환)
type Message = {
id: string;
content: string;
user_name: string;
created_at: Date;
};

export async function POST(request: Request) {
console.log("POST 요청 시작");
const session = await getServerSession(authOptions);

if (!session || !session.user) {
console.log("인증되지 않은 사용자");
return NextResponse.json({ error: "인증되지 않은 사용자입니다." }, { status: 401 });
}

try {
const contentType = request.headers.get("content-type");
let content: any;

text
if (contentType?.includes("application/json")) {
  const body = await request.json();
  console.log("JSON 요청 본문:", body);
  content = body.content;
} else {
  // application/x-www-form-urlencoded 등 다른 형식의 경우
  const formData = await request.formData();
  content = formData.get("content");
  console.log("폼 데이터 요청 본문:", content);
}

if (typeof content !== "string" || content.length < 1 || content.length > 500) {
  console.log("잘못된 메시지 내용:", content);
  return NextResponse.json(
    { error: "메시지 내용은 1자 이상 500자 이하여야 합니다." },
    { status: 400 }
  );
}

console.log("메시지 저장 시도:", content, session.user.name);

// MongoDB 연결
const { db } = await connectToDatabase();
const messagesCollection = db.collection("messages");

// MongoDB에 새 메시지 삽입 (created_at은 현재 시간)
const insertResult = await messagesCollection.insertOne({
  content,
  user_name: session.user.name || "",
  created_at: new Date(),
});

console.log("MongoDB insert 결과:", insertResult);

if (insertResult.acknowledged) {
  // 메시지 삽입 후 /guestbook 페이지로 리다이렉트 (303: See Other)
  return NextResponse.redirect(new URL("/guestbook", request.url), 303);
} else {
  throw new Error("메시지가 저장되지 않았습니다.");
}
} catch (error) {
console.error("메시지 저장 중 오류 발생:", error);
return NextResponse.json(
{
error: "메시지 저장에 실패했습니다.",
details: error instanceof Error ? error.message : String(error),
},
{ status: 500 }
);
}
}

export async function GET(request: Request) {
try {
const { searchParams } = new URL(request.url);
const limit = Math.min(parseInt(searchParams.get("limit") || "100", 10), 100); // 최대 100개
const offset = Math.max(parseInt(searchParams.get("offset") || "0", 10), 0);

text
// MongoDB 연결
const { db } = await connectToDatabase();
const messagesCollection = db.collection("messages");

// 메시지들을 생성일(created_at) 내림차순으로 정렬하여 조회
const messagesCursor = messagesCollection
  .find({})
  .sort({ created_at: -1 })
  .skip(offset)
  .limit(limit);
const messagesArray = await messagesCursor.toArray();

// _id를 문자열로 변환하여 id 필드로 매핑 (클라이언트가 원활하게 사용할 수 있도록)
const messages: Message[] = messagesArray.map((msg: any) => ({
  id: msg._id.toString(),
  content: msg.content,
  user_name: msg.user_name,
  created_at: msg.created_at,
}));

return NextResponse.json({ messages }, { status: 200 });
} catch (error) {
console.error("메시지 조회 중 오류 발생:", error);
return NextResponse.json({ error: "메시지 조회에 실패했습니다." }, { status: 500 });
}
}