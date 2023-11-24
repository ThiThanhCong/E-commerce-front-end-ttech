"use client"

import { handleCart } from "@/app/api/handleCart"
import { UserAuth } from "@/context/AuthContext"
import { UserCart } from "@/context/CartContex"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { CiShoppingCart } from "react-icons/ci"
const Cart = () => {
	const router = useRouter()
	const { totalProduct, setTotalProduct } =
		UserCart()
	const { user } = UserAuth()

	return (
		<motion.div
			onClick={() => {
				router.push(user?.user_id ? "cart" : "login")
			}}
			className='relative cursor-pointer'
		>
			<CiShoppingCart size={25} />
			<div className='absolute top-0 right-0 translate-x-1/2 rounded-xl bg-blue-500/90 px-2 text-[10px] font-semibold text-white'>
				{totalProduct}
			</div>
		</motion.div>
	)
}

export default Cart
