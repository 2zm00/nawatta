import Link from "next/link";

export default function Info() {
	return(
	<div className="flex flex-col items-center justify-center min-h-screen py-2 ">
		<h1 className="text-4xl">
			여기에 정보가 입력될 예정입니다
		</h1>
		<Link href="/" className="text-xl mb-8">
			돌아가기
		</Link>

	</div>

	)
}
