"use client"

import { UserAuth } from "@/context/AuthContext"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import UserDataForm from "../../components/UserDataForm"
const Page = () => {
	const { token, user } = UserAuth()

	return (
		<div
			onClick={() => {}}
			className='container mx-auto'
		>
			<motion.div className='text-[5rem] font-[300] uppercase h-[60px] leading-[60px]'>
				<motion.div
					initial='offscreen'
					whileInView='onscreen'
					transition={{ staggerChildren: 0.1 }}
					className='w-[100vw] font-[600] '
				>
					{`HY! ${user?.name}`
						.split("")
						.map((t, i) => (
							<motion.span
								variants={textAnimate}
								key={i}
							>
								{t}
							</motion.span>
						))}
				</motion.div>
			</motion.div>
			<UserDataForm />
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
