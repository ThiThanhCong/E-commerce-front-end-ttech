"use client"
import { CiShoppingBasket, CiUser } from "react-icons/ci"
import BestSellProduct from "../BestSellProduct"
import AdminRevenueChart from "./AdminRevenueChart"
import AdminVisitorChart from "./AdminVisitorChart"
import CompareRevenue from "./CompareRevenue"
import CountingInfor from "../CountingInfor"

const AdminDashboard = () => {
	return (
		<div className=' h-[150vh] mt-10'>
			<div className='flex gap-4'>
				<div className='flex-1 flex flex-col gap-4'>
					<div className='rounded-2xl'>
						<CompareRevenue />
					</div>
					<CountingInfor />
				</div>

				<div className='bg-white border border-black/20 w-[60%] flex flex-col  shadow-sm p-10 rounded-3xl'>
					<AdminRevenueChart />
				</div>
			</div>
			<div className='flex'>
				<AdminVisitorChart />
				{/* <BestSellProduct /> */}
			</div>
		</div>
	)
}

export default AdminDashboard
