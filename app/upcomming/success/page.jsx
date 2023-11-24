"use client"

import { useRouter } from "next/navigation"
import { CiHome } from "react-icons/ci"

const Page = () => {
	const router = useRouter()
	return (
		<div className='w-full h-screen bg-black'>
			<div className='fixed -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2'>
				<h1 className='text-[7rem] mx-auto text-blue-200 capitalize w-full leading-[7rem] text-center font-[700]'>
					Đơn hàng của bạn đã được đặt thành công.
				</h1>
				<div className='flex flex-col items-center gap-5'>
					<h2 className='text-4xl text-white text-center mt-20'>
						Trở về trang chủ
					</h2>
					<CiHome
						onClick={() => router.push("/")}
						size={50}
						className='text-white cursor-pointer p-4 bg-blue-600 rounded-full'
					/>
				</div>
			</div>
		</div>
	)
}

export default Page
