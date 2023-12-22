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
	const handleOnClick = () => {
		if (user?.user_id) {
			router.push("/cart")
			return
		}

		router.push("/login")
	}
	return (
		<motion.div
			onClick={() => {
				handleOnClick();
			}}
			className='relative cursor-pointer'
		>
			<CiShoppingCart size={25} />
		</motion.div>
	)
}

export default Cart
