"use client"

import CartDetail from "@/components/CartDetail"
import OrderBill from "@/components/OrderBill"

const Page = () => {
	return (
		<div className='mt-20 mx-auto container mb-24'>
			<div className='w-full flex gap-10 justify-center flex-col md:flex-row '>
				<CartDetail />

				<OrderBill />
			</div>
		</div>
	)
}

export default Page
