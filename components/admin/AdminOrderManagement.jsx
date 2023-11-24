"use client"

import { handleOrder } from "@/app/api/handleOrder"
import { useEffect, useState } from "react"
import OrderRenderList from "./orderManagement/OrderRenderList"

const AdminOrderManagement = () => {
	const [orderList, setOrderList] = useState([
		{
			customerInfor: {
				user_id: "001",
				name: "Cao Hoài Sang",
				email: "Sang@gmail.com",
				phone: "0944552050",
				password:
					"$2a$11$/VyLbThx9mdMq1AXmqhSpuDQcEQOn0Q3IcQH04mfksGgbBE4MgBsS",
				isAdmin: "1",
				create_at: "2023-11-04T05:35:56",
			},
			orderInfor: {
				orderId: "11e77c53-c765-4c13-88a5-a5d8e4ef1d2f",
				userId: "001",
				createOrderAt: "2023-11-13T12:57:56",
				name: "CAO HOAI SANG",
				email: "sangfc347@gmail.com",
				phone: "0944552050",
				address: "Kí túc xá khu B, ĐHQG",
				state: "pending",
				note: "Che tên sản phẩm",
				total: 17000000,
				discount: "2",
				deliveryFee: 0,
			},
			discountInfor: {
				discountId: "2",
				discountCode: "FALL20",
				discountAmount: 20,
				discountDateFrom: "2022-09-01T07:00:00",
				discountDateTo: "2022-10-01T06:59:59",
			},
		},
	])

	const getAllOrder = async () => {
		const result = await handleOrder.getAllOrder()
		setOrderList(result)
	}

	useEffect(() => {
		getAllOrder()
	}, [])

	return (
		<div className='mx-auto container'>
			<div>
				<OrderRenderList
					orderList={orderList}
					setOrderList={setOrderList}
				/>
			</div>
		</div>
	)
}

export default AdminOrderManagement
