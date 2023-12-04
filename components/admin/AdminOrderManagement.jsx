"use client"

import { handleOrder } from "@/app/api/handleOrder"
import { useEffect, useState } from "react"
import OrderRenderList from "./orderManagement/OrderRenderList"
import { AnimatePresence, motion } from "framer-motion"
import DetailOrder from "./orderManagement/DetailOrder"
import OrderFeatures from "./orderManagement/OrderFeatures"
import { UserAuth } from "@/context/AuthContext"

const AdminOrderManagement = () => {

	const token = JSON.parse(localStorage.getItem('token'))
	const [orderList, setOrderList] = useState([{
		order_id: "321312",
		user_id: "UserEFM",
		create_order_at: "2023-11-24 14:32:07",
		name: "SieuAdmin",
		email: "thisIsAdmin@gmail.com",
		phone: "1235813211",
		address: "rong",
		state: "pending",
		note: "asd",
		total: 99200000,
		discount: "2",
		delivery_fee: 123,
		customer_infor: {
			user_id: "UserEFM",
			name: "SieuAdmin",
			email: "thisIsAdmin@gmail.com",
			phone: "1235813211",
			role: "admin",
			create_at: "2023-11-15 19:21:16"
		},
		discount_in_for: {
			discount_id: "2",
			discount_code: "CODE456",
			discount_amount: 20,
			discount_date: "2023-11-25 00:00:00"
		}
	},])

	const [trigger, setTrigger] = useState(false)

	const getAllOrder = async () => {
		const result = await handleOrder.getAllOrder(token)
		console.log(result)
		setOrderList(result)
	}

	useEffect(() => {
		getAllOrder()
	}, [setTrigger])

	const [currentOrderClick, setCurrentOrderClick] = useState(
		{}
	)

	useEffect(() => {
		console.log(currentOrderClick)
		console.log(currentOrderClick?.order_id)
	}, [currentOrderClick])

	return (
		<div className='mx-auto mt-10 container'>
			<OrderFeatures />

			<div>
				<OrderRenderList
					orderList={orderList}
					setOrderList={setOrderList}
					currentOrderClick={currentOrderClick}
					setCurrentOrderClick={setCurrentOrderClick}
					setTrigger={setTrigger}
				/>
			</div>

			<AnimatePresence>
				{currentOrderClick?.order_id && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						whileInView={{
							opacity: 1,
							height: "auto",
						}}
						exit={{ opacity: 0, height: 0 }}
						className='fixed inset-0 bg-white origin-top'
					>
						<DetailOrder
							currentOrderClick={currentOrderClick}
							setCurrentOrderClick={setCurrentOrderClick}
							setTrigger={setTrigger}
						/>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

export default AdminOrderManagement
