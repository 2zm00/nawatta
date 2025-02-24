import Link from "next/link";


export default function MainLayout() {
	return(
		<div className="flex flex-col items-center justify-center min-h-screen py-2">
			<h1 className="text-6xl font-bold mb-12">
				나 와따..!
			</h1>
			<p className="text-xl mb-16">
				방명록에 들러 여러분의 발자취를 남겨주세요!
			</p>
			<Link href="/guestbook" className="mb-12 px-6 py-2 bg-blue-500 shadow-blue-500/50 shadow-lg  text-white rounded-md hover:bg-blue-400 transition-colors">
				말하러가기
			</Link> 
			<Link href="/info" className="mb-12 px-6 py-2 bg-cyan-500 text-white text-bold rounded-md hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/50"> 
				Info
			</Link>
		</div>
	)
}
