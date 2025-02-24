import Link from "next/link";


export default function InfoLayout() {
	return(
		<div className="flex flex-col justify-center items-center pt-60">
			<div className="box-content grid grid-cols-1 text-black mx-auto ">
				<div className=" text-black pb-16 text-center">
					Let me Introduce my self
				</div>

				<Link href="https://leezmodev.vercel.app"
				className="flex flex-auto justify-center items-center text-center border-spacing-10 border rounded-full hover:bg-rose-400 hover:shadow-lg shadow-md bg-rose-500 py-32 px-32 ">
						<h1 className="text-5xl text-white text-opacity-80 "> Here It IS! </h1>
				</Link>

				<Link href="/" className="text-xl mx-auto mt-32 bg-purple-700 text-white rounded-md border-spacing-2 px-4 py-2 border-white   hover:bg-purple-400 hover:shadow-inner shadow-md ">
				돌아가기
				</Link>
			</div>
		</div>
	)
}
