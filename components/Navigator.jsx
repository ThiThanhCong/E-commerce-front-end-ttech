"use client"
import { UserAuth } from "../context/AuthContext"
import {
	easeInOut,
	motion,
	useMotionValueEvent,
	useScroll,
} from "framer-motion"
import { useRouter } from "next/navigation"
import { useState } from "react"

import {
	CiChat2,
	CiPercent,
	CiShop,
	CiUser,
} from "react-icons/ci"

const Navigator = () => {
	const { scrollY } = useScroll()
	const [hidden, setHidden] = useState(false)
	const router = useRouter()
	const { user } = UserAuth()

	useMotionValueEvent(
		scrollY,
		"change",
		(lastest) => {
			const previous = scrollY.getPrevious()

			if (lastest > previous && lastest > 150)
				setHidden(true)
			else setHidden(false)
		}
	)

	return (
		<>
			<motion.ul
				variants={{
					visible: { y: 0 },
					hidden: { y: "100%" },
				}}
				animate={hidden ? "hidden" : "visible"}
				transition={{
					duration: 0.15,
					ease: easeInOut,
				}}
				className='md:hidden font-[300] z-20 fixed bottom-0 left-0 right-0 bg-white/20 backdrop-blur-xl p-2 flex justify-around'
			>
				<motion.li
					whileHover={{ color: "red" }}
					onClick={() => {
						router.push("/")
					}}
					className='flex flex-col bg-transparent cursor-pointer gap-1 w-[200px] justify-center items-center'
				>
					<CiShop size={23} />
					<div className='text-[1.1rem]'>
						Trang chủ
					</div>
				</motion.li>

				<motion.li
					whileHover={{ color: "red" }}
					onClick={() => {
						router.push("/products?promotion=true")
					}}
					className='flex flex-col bg-transparent cursor-pointer gap-1 w-[200px] justify-center items-center'
				>
					<CiPercent size={23} />
					<div className='text-[1.1rem]'>
						Khuyến mãi
					</div>
				</motion.li>

				<motion.li
					whileHover={{ color: "red" }}
					className='flex flex-col bg-transparent cursor-pointer gap-1 w-[200px] justify-center items-center'
				>
					<CiChat2 size={23} />
					<div className='text-[1.1rem]'>Tư vấn</div>
				</motion.li>

				<motion.li
					onClick={() => {
						const route = user ? "account" : "login"
						router.push(route)
					}}
					whileHover={{ color: "red" }}
					className='flex flex-col bg-transparent cursor-pointer gap-1 w-[200px] justify-center items-center'
				>
					<CiUser size={23} />
					<div className='text-[1.1rem]'>
						Tài khoản
					</div>
				</motion.li>
			</motion.ul>
		</>
	)
}

export default Navigator
