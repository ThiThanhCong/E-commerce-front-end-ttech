"use client"

import { handleCart } from "@/app/api/handleCart"
import { UserAuth } from "@/context/AuthContext"
import { UserCart } from "@/context/CartContex"
import { convertToVND } from "@/utils/until"
import {
	CiCircleMinus,
	CiCirclePlus,
} from "react-icons/ci"
import CircleLoader from "./CircleLoader"
import Image from "next/image"
import { useEffect } from "react"
const CartDetail = () => {
	let user = null
	useEffect(() => {
		if (localStorage.getItem("user"))
			user = JSON.parse(localStorage.getItem('user'))
	}, [])
	const {
		setTotalProduct,
		cart,
		setCart,
		loading,
	} = UserCart()
	const handleDecreaseQuantity = async (
		productId
	) => {
		const productIndex = cart.findIndex(
			(item) => item.product.product_id === productId
		)
		const product = cart[productIndex]

		const newQuantity = product.quantity - 1

		const updatedProduct = {
			...product,
			quantity: newQuantity,
		}

		await handleCart.UpdateQuantity(
			{
				user_id: user.user_id,
				product_id: updatedProduct.product.product_id,
				quantity: newQuantity,
			}
		)

		if (newQuantity === 0) {
			const updatedCart = [...cart]
			updatedCart.splice(productIndex, 1)
			setTotalProduct(updatedCart.length)
			setCart(updatedCart)
		} else if (newQuantity > 0) {
			const updatedCart = [...cart]

			updatedCart[productIndex] = {
				...updatedProduct,
			}
			setTotalProduct(updatedCart.length)

			setCart(updatedCart)
		}
	}

	const handleIncreaseQuantity = async (
		productId
	) => {
		const productIndex = cart.findIndex(
			(item) => item.product.product_id === productId
		)
		const product = cart[productIndex]

		const newQuantity = product.quantity + 1

		const updatedProduct = {
			...product,
			quantity: newQuantity,
		}

		const updatedCart = [...cart]

		updatedCart[productIndex] = {
			...updatedProduct,
		}

		await handleCart.UpdateQuantity(
			{
				user_id: user.user_id,
				product_id: updatedProduct.product.product_id,
				quantity: newQuantity,
			},
			token
		)
		setTotalProduct(updatedCart.length)

		setCart(updatedCart)
	}

	return (
		<div className='flex flex-row gap-10 flex-wrap justify-center max-h-[600px] overflow-y-scroll customScrollBar'>
			{cart?.map((x, i) => {
				return (
					<div
						key={i}
						className='flex flex-col items-center p-4 rounded-3xl bg-white'
					>
						<div className='w-[200px] h-[200px] rounded-3xl select-none'>
							{loading ? (
								<CircleLoader />
							) : (
								<Image
									src={x?.product?.image[0]?.image_path}
									alt="no image here chicken"
									layout="responsive"
									width={500}
									height={500}
									className='p-4 rounded-2xl object-cover'
								/>
							)}
						</div>
						<h2 className='text-[1.6rem] select-none w-[100px] text-center text-ellipsis font-semibold '>
							{x?.product?.name_pr || "Loading..."}
						</h2>

						<h3 className='text-[1.4rem] mt-4 select-none text-black/80 font-semibold '>
							{convertToVND(x?.product?.price || 0)}
						</h3>

						<div className='inline-flex mt-2 bg-blue-500/80 px-2 py-1 text-white rounded-full items-center text-xl justify-center gap-2'>
							<div
								className='cursor-pointer'
								onClick={() =>
									handleDecreaseQuantity(
										x.product.product_id
									)
								}
							>
								<CiCircleMinus size={25} />
							</div>
							<h3 className='select-none'>
								{x?.quantity || 0}
							</h3>
							<div
								className='cursor-pointer'
								onClick={() =>
									handleIncreaseQuantity(
										x.product.product_id
									)
								}
							>
								<CiCirclePlus size={25} />
							</div>
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default CartDetail
