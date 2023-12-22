"use client"

import { UserAuth } from "@/context/AuthContext"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import UserDataForm from "../../components/UserDataForm"
import UserOrder from "../../components/UserOrder"
import { CiLogout } from "react-icons/ci"

const Page = () => {
	const { token, user, logout } = UserAuth()

	return (
		<div
			onClick={() => { }}
			className='container mx-auto'
		>
			<motion.div className='text-[4rem] md:text-[5rem] leading-[4rem] md:leading-[5rem] mx-2 font-[300] uppercase h-[60px]'>
				<motion.div

					className='w-[100vw] font-[600] flex justify-between '
				>
					{`HY! ${user?.name}`

					}
					<CiLogout
						size={35}
						onClick={() => logout()}
						className='bg-red-500 mr-4 text-white p-2 rounded-3xl cursor-pointer'
					/>
				</motion.div>
			</motion.div>
			<UserDataForm />
			<UserOrder />
		</div>
	)
}

export default Page

const textAnimate = {
	offscreen: { opacity: 0 },
	onscreen: {
		opacity: 1,
		transition: {
			type: "spring",
			bounce: 0.4,
			duration: 1,
		},
	},
}
