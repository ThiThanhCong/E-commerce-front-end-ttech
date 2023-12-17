"use client"
import { UserAuth } from "@/context/AuthContext"
import { v4 as uuidv4 } from "uuid"

import { handleCart } from "@/app/api/handleCart"
import { handleDetailOrder } from "@/app/api/handleDetailOrder"
import { handleOrder } from "@/app/api/handleOrder"
import { handleTransaction } from "@/app/api/handleTransaction"

import {
	isValidEmail,
	isValidPhoneNumber,
} from "@/utils/until"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useRef, useState } from "react"
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
	const [selectedPaymentType, setSelectedPaymentType] =
		useState("")
	const paymentTypeRef = useRef()
	const handleSubmit = async () => {
		const orderId = Date.now();
		setLoading(true)
		const state =
			selectedPaymentType === "bank" ? "banked" : "pending"

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
		// const detailOrder = [...cart].map((x) => ({
		// 	orderId,
		// 	productId: x.product.product_id,
		// 	pricePr: x.product.price,
		// 	quantityPr: x.quantity,
		// }))

		await handleOrder.addNewOrder(order, token)
		// await handleDetailOrder.addNewDetailOrder(
		// 	detailOrder,
		// 	token
		// )
		await handleCart.EmptyCartUser(user, token)
		setCart([])
		setLoading(false)

		if (selectedPaymentType === "bank") {
			const result = await handleTransaction.bank(totalPrice, orderId)
			router.push(result)
			return
		} else router.push("/upcomming/success")
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

				<div className='mt-10 text-black w-full'>
					<h1 className='text-xl'>Hình thức thanh toán</h1>
					<div className='flex items-center gap-4'>
						<input
							type='radio'
							name='payment-type'
							value='cash'
							id='cash'
							checked={selectedPaymentType === "cash"}
							onChange={() => {
								setSelectedPaymentType("cash")
								paymentTypeRef.current.focus()
							}}
						/>
						<label htmlFor='cash' className='text-2xl'>
							Thanh toán khi nhận hàng
						</label>
					</div>
					<div className='flex items-center gap-4'>
						<input
							type='radio'
							name='payment-type'
							value='bank'
							id='bank'
							checked={selectedPaymentType === "bank"}
							onChange={() => {
								setSelectedPaymentType("bank")
								paymentTypeRef.current.focus()
							}}
							ref={paymentTypeRef} // Set the ref here for the second radio input element. This will allow us to focus on it after selecting it.
						/>
						<label htmlFor='bank' className='text-2xl'>
							Chuyển khoản ngân hàng
						</label>
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