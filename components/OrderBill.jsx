"use client"

import { UserCart } from "@/context/CartContex"
import { convertToVND } from "@/utils/until"
import { useEffect, useState } from "react"
import OrderFormData from "./OrderFormData"

const OrderBill = () => {
	const {
		totalProduct,
		setTotalProduct,
		cart,
		setCart,
		cartLoading,
		setCartLoading,
		setTriggerRerender,
		triggerRerender,
		totalPrice,
		setTotalPrice,
	} = UserCart()

	return (
		<div className='flex flex-col items-center p-8 shrink-0  bg-white min-w-[300px] max-w-[500px] pb-[500px]'>
			<h1 className='text-black font-semibold text-4xl text-center'>
				Chi tiết hóa đơn
			</h1>

			<h1 className='text-black font-[300] w-full text-xl text-center whitespace-nowrap overflow-hidden'>
				--------------------------------------------------------------------------
			</h1>

			<table className='w-full text-2xl text-left '>
				<thead>
					<tr>
						<th className='p-2'>Sản phẩm</th>
						<th className='p-2'>Số lượng</th>
						<th className='p-2'>Tổng tiền</th>
					</tr>
				</thead>
				<tbody className=''>
					{cart?.map((x, i) => (
						<tr
							key={i}
							className='border-t border-slate-500/60 my-2'
						>
							<td className='p-2'>
								{x?.product?.name_pr || "loading"}
							</td>
							<td className='p-2'>{x.quantity}</td>
							<td className='p-2'>
								{convertToVND(
									x?.quantity * x?.product?.price || 0
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>

			<div className='text-sky-500 text-3xl text-center p-2 w-full rounded-full font-[600] mt-2'>
				Tổng: {convertToVND(totalPrice)}
			</div>

			<div className='h-[1px] bg-black/40 w-full mt-[12px]'></div>

			<OrderFormData
				cart={cart}
				setCart={setCart}
				totalPrice={totalPrice}
			/>
		</div>
	)
}

export default OrderBill
