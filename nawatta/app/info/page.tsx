import Link from "next/link";
import { IoLinkSharp, IoLogoGithub  } from "react-icons/io5";

export default function Info() {
	return(
	<div className="flex flex-col items-center justify-center min-h-screen py-2 ">
		<h1 className="text-4xl mb-8">
			Jeongmo Lee
		</h1>
		<h3 className="text-3xl mb-8">
			I'm i'm zmo
		</h3>
		<div className='container mx-auto flex justify-between items-center'>
			<Link href="https://github.com/2zm00" className=" px-4 py-1 mb-8">
				<IoLinkSharp className="mr-1"/>
					Link
		</Link>
		</div>


		<Link href="/" className="text-xl mb-8 bg-purple-700 text-white rounded-md border-spacing-2 px-4 py-2 border-white   hover:bg-purple-400 hover:shadow-inner shadow-md ">
			돌아가기
		</Link>
		<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
			
		</div>

	</div>

	)
}
