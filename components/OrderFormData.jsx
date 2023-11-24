"use client"
import { UserAuth } from "@/context/AuthContext"
import { v4 as uuidv4 } from "uuid"

import { handleCart } from "@/app/api/handleCart"
import { handleDetailOrder } from "@/app/api/handleDetailOrder"
import { handleOrder } from "@/app/api/handleOrder"
import {
	isValidEmail,
	isValidPhoneNumber,
} from "@/utils/until"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useState } from "react"
import CircleLoader from "./CircleLoader"

const OrderFormData = ({ cart, setCart, totalPrice }) => {
	const {
		user,
		setUser,
		googleSignIn,
		logOutGoogle,
		setToken,
		token,
	} = UserAuth()

	const router = useRouter()

	const [data, setData] = useState({
		name: user?.name,
		address: "",
		email: user?.email,
		phone: user?.phone,
		note: "",
	})

	const [error, setError] = useState({
		name: "",
		address: "",
		email: "",
		phone: "",
	})

	const handleValueChange = (e) => {
		const { id, value } = e.target

		let errorMessage = ""
		if (!value.trim()) {
			errorMessage = `Vui lòng nhập ${id == "name"
				? "tên"
				: id == "email"
					? "email"
					: id == "password"
						? "mật khẩu"
						: id == "phone"
							? "số điện thoại"
							: "địa chỉ"
				}`
		} else if (id === "phone" && !isValidPhoneNumber(value)) {
			errorMessage = "Sai định dạng số điện thoại"
		} else if (id === "email" && !isValidEmail(value))
			errorMessage = "Sai định dạng email"

		setError((pre) => ({
			...pre,
			[id]: errorMessage,
		}))
		setData((pre) => ({
			...pre,
			[id]: value,
		}))
	}

	const [loading, setLoading] = useState(false)

	const handleSubmit = async () => {
		setLoading(true)
		const orderId = uuidv4()
		console.log(user)
		const order = {
			order_id: orderId,
			// createOrderAt: new Date().getTime(),
			user_id: user.user_id,
			name: user.name,
			email: user.email,
			phone: user.phone,
			address: "testAdd",
			state: "pending",
			note: data.Note || "khong co",
			discount: "2",
			delivery_fee: "0",
		}

		// const cart = [
		// 	{
		// 		product: {
		// 			product_id: "ABC123",
		// 			name_pr: "Samsung Galaxy S21",
		// 			name_serial: "GA007",
		// 			detail:
		// 				"6.2-inch display, 12GB RAM, 256GB storage, 64MP camera",
		// 			price: 12000000,
		// 			quantity_pr: 50,
		// 			guarantee_period: 12,
		// 			supplier_id: "SUPLLIER001",
		// 		},
		// 		quantity: 1,
		// 		category: {
		// 			category_id: "0PbC1aL2mN3oPqRs",
		// 			category_name: "Điện thoại di động",
		// 		},
		// 		supplier: {
		// 			supplier_id: "SUPLLIER001",
		// 			supplier_name: "Samsung",
		// 		},
		// 		image: {
		// 			image_id: "ABC123001",
		// 			product_id: "ABC123",
		// 			image_href:
		// 				"https://localhost:7067/Upload/product/ABC123/ABC123_1.jpg",
		// 		},
		// 	},
		// ]
		console.log(cart)
		const detailOrder = [...cart].map((x) => ({
			orderId,
			productId: x.product.product_id,
			pricePr: x.product.price,
			quantityPr: x.quantity,
		}))
		console.log("adding these item:", detailOrder)
		await handleOrder.addNewOrder(order, token)
		// await handleDetailOrder.addNewDetailOrder(
		// 	detailOrder,
		// 	token
		// )
		console.log(user)
		await handleCart.EmptyCartUser(user, token)
		setCart([])
		setLoading(false)
		router.push("/upcomming/success")
	}

	return (
		<div className='w-full'>
			<h1 className='text-center text-4xl font-[700] mt-8'>
				Thông tin khách hàng
			</h1>

			<form
				onSubmit={(e) => e.preventDefault()}
				className='flex flex-col gap-4 mt-4'
			>
				{[
					{
						name: "Tên khách hàng",
						key: "name",
						placeholder: "vui lòng nhập tên khách hàng",
					},
					{
						name: "Email",
						key: "email",
						placeholder: "Vui lòng nhập email",
					},
					{
						name: "Số điện thoại",
						key: "phone",
						placeholder: "Vui lòng nhập số điện thoại",
					},
					{
						name: "Địa chỉ",
						placeholder: "Vui lòng nhập địa chỉ",
						key: "address",
					},
				].map((x, i) => (
					<div key={i} className='flex flex-col mb-2 '>
						<label className='text-xl mb-1'>{x.name}</label>
						<motion.input
							whileFocus={{
								margin: 4,
								scale: 1.2,
							}}
							value={data[x.key]}
							className='border-none outline-none bg-transparent text-2xl origin-top-left'
							id={x.key}
							placeholder={x.placeholder}
							onChange={handleValueChange}
							type='text'
						/>
						<h2 className='text-red-500 mt-1 text-left text-md'>
							{error[x.key]}
						</h2>
					</div>
				))}

				<div className='flex flex-col'>
					<label className='text-xl mb-1'>
						Ghi chú{" "}
						<span className='text-black/40'>(optional)</span>
					</label>
					<motion.textarea
						placeholder='Vui lòng nhập ghi chú'
						value={data["Note"]}
						onChange={(e) => {
							setData((pre) => ({
								...pre,
								Note: e.target.value,
							}))
						}}
						className='border-none outline-none text-2xl origin-top-left'
					></motion.textarea>
				</div>

				<div className='mt-10 text-black'>
					<div className='flex gap-2 items-center'>
						<div className='w-5 h-5 bg-blue-500 rounded-2xl outline outline-1 outline-blue-500 outline-offset-2'></div>
						<h1 className='text-2xl'>Thanh toán khi nhận hàng</h1>
					</div>
				</div>

				<button
					onClick={handleSubmit}
					className='w-full bg-blue-500 rounded-full text-white py-3 text-2xl flex items-center justify-center font-bold'
				>
					{loading ? <CircleLoader /> : "Hoàn tất"}
				</button>
			</form>
		</div>
	)
}

export default OrderFormData