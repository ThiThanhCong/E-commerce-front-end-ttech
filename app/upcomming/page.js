"use client"
import { useRouter } from "next/navigation"
import { CiHome } from "react-icons/ci"

const Page = () => {
	const router = useRouter()
	return (
		<div className='w-full h-screen bg-black text-white flex flex-col justify-center items-center'>
			<h1 className=' w-2/3 leading-[100px] text-center font-[700] text-[100px]'>
				<span className='bg-gradient-to-r from-slate-500 to-slate-800 p-2'>
					Tính năng
				</span>{" "}
				này sẽ có trong tương lai
			</h1>
			<div className='text-4xl mt-16 leading-[26px] font-[500] text-white/70 text-center'>
				Chúng tôi rất mong sự giúp đỡ đến từ các bạn.{" "}
				<br></br>
				Ủng hộ nhà phát triển tại{" "}
				<strong className='text-white'>
					@Momo 0944552050
				</strong>
			</div>

			<div
				onClick={() => {
					router.push("/")
				}}
				className='fixed top-10 left-10 p-2 cursor-pointer  bg-blue-600 rounded-full flex items-center justify-center'
			>
				<CiHome size={30} color='white' />
			</div>
		</div>
	)
}

export default Page
