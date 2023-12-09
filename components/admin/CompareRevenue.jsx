"use client"

import { handleAdmin } from "@/app/api/handleAdmin"
import { useEffect, useState } from "react"
import {
	BiLineChart,
	BiLineChartDown,
} from "react-icons/bi"
import { CiCreditCard1 } from "react-icons/ci"
import {
	convertToVND,
	getCurrentMonth,
	getPreCurrentMonth,
} from "../../utils/until"
import { UserAuth } from "@/context/AuthContext"

const CompareRevenue = () => {
	const token = JSON.parse(localStorage.getItem('token'))
	const [revenue, setRevenue] = useState({
		thisMonthRevenue: 132314256,
		lastMonthRevenue: 0,
		percentDifference: 100,
	})

	const getData = async () => {
		const response = await handleAdmin.GetRevenue(token)
		setRevenue(response)
	}

	useEffect(() => {
		getData()
	}, [])

	return (
		<div className='text-white '>
			<div className='rounded-3xl border border-black/20 px-2 py-10 bg-white text-black'>
				<div className='w-full px-8 top-8'>
					<div className='flex justify-between'>
						<div className=''>
							<h1 className='font-light'>Name</h1>
							<h1 className='font-medium tracking-widest'>
								T-TECH
							</h1>
						</div>
						<div>
							<CiCreditCard1 size={30} />
						</div>
					</div>

					<div className='pt-1'>
						<h1 className='font-light'>
							<span>Doanh thu tháng </span>
							{getCurrentMonth()}
						</h1>
						<div className='flex items-end gap-3'>
							<div className='font-bold text-[2rem] tracking-more-wider'>
								{convertToVND(revenue?.thisMonthRevenue)}
							</div>
							<div>
								{revenue?.percentDifference > 1 ? (
									<div className='flex items-center text-[1.2rem]  gap-1 '>
										<BiLineChart size={15} color='green' />{" "}
										{revenue?.percentDifference} %
									</div>
								) : (
									<div className='flex items-center text-[1.2rem]  gap-1 '>
										<BiLineChartDown size={15} color='red' />{" "}
										{revenue?.percentDifference} %
									</div>
								)}
							</div>
						</div>
					</div>

					<div className='pt-1'>
						<h1 className='font-light'>
							<span>Doanh thu tháng </span>
							{getPreCurrentMonth()}
						</h1>
						<div className='font-bold text-[2rem] tracking-more-wider'>
							{convertToVND(revenue?.lastMonthRevenue)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CompareRevenue
