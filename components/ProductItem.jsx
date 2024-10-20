"use client"

import { handleCart } from "@/app/api/handleCart"
import { UserAuth } from "@/context/AuthContext"
import { convertToVND } from "@/utils/until"
import {
	AnimatePresence,
	motion,
} from "framer-motion"
import Image from "next/image"
import { useRouter } from "next/navigation"
import CircleLoader from "./CircleLoader"
import { useState } from "react"
import { UserCart } from "@/context/CartContex"
import Notification from "./Notification"
const ProductItem = ({
	product_id,
	category_id,
	loading,
	name_pr,
	detail,
	price,
	quantity_pr,
	img_href,
	guarantee_period,
}) => {
	const router = useRouter()
	const { user, setUser, token } = UserAuth()
	const { cartLoading, setCartLoading } = UserCart()
	const { totalProduct, setTotalProduct } =
		UserCart()
	const [notifications, setNotifications] =
		useState(false)

	const addToCart = async (product_id) => {
		const data = {
			user_id: user?.user_id,
			product_id: product_id,
			quantity: 1,
		}

		const result = await handleCart.AddToCart(
			data,
			token
		)
		console.log(result)
	}
	return (
		<div className='flex flex-col bg-white p-4 items-center mb-10'>
			<AnimatePresence>
				{notifications && (
					<Notification
						setNotifications={setNotifications}
						notifications={notifications}
						notification={{
							style: "success",
							text:
								"Sản phẩm đã được thêm vào giỏi hàng của bạn",
						}}
					/>
				)}
			</AnimatePresence>

			<div className='relative w-[200px] h-[200px] object-cover rounded-3xl flex items-center justify-center'>
				{loading ? (
					<CircleLoader />
				) : (
					<Image
						src={img_href}
						alt="not thing here but us chicken"
						layout="responsive"
						width={500}
						height={500}
						className='rounded-[30px] object-cover'
					/>
				)}
			</div>
			<h1 className='text-[1.7rem] z-10 font-[700] mt-5 max-w-[85%] overflow-hidden whitespace-nowrap overflow-ellipsis'>
				{name_pr || "Loading..."}
			</h1>

			<h2 className='text-[1.3rem] text-center w-2/3 display-2-line font-[500] mt-5'>
				{detail || "Loading..."}
			</h2>

			<h2 className=' text-[1.6rem] font-[700] mt-5'>
				{convertToVND(price) || "Loading..."}
			</h2>

			<div
				onClick={() => {
					router.push("/products/" + product_id)
				}}
				className='text-[1.2rem] mb-6 text-blue-500 text-center cursor-pointer'
			>
				Tìm hiểu thêm
			</div>

			<motion.button
				onClick={() => {
					addToCart(product_id)
					setNotifications(true)
					setTotalProduct((pre) => pre + 1)
				}}
				whileHover={{
					scale: [1, 1.1],
				}}
				className=' transition-all
			hover:bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600
			
			
			px-2 bg-blue-500 text-white font-[600] text-[1.6rem] mt-1'
			>
				Buy now
			</motion.button>
		</div>
	)
}

export default ProductItem
