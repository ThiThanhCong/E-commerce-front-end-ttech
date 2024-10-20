"use client"
import { handleAdmin } from "@/app/api/handleAdmin"
import { faker } from "@faker-js/faker"
import {
	BarElement,
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LineElement,
	LinearScale,
	PointElement,
	Title,
	Tooltip,
} from "chart.js"
import { useEffect, useState } from "react"
import { Line } from "react-chartjs-2"
import { CiWavePulse1 } from "react-icons/ci"
import { UserAuth } from "@/context/AuthContext"


ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	LineElement,
	PointElement
)

function getWeekLabels() {
	const labels_week = [
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
		"Sunday",
	]
	const today = new Date()
	const currentDayIndex = today.getDay()
	if (currentDayIndex === 0) return labels_week

	return labels_week.slice(0, currentDayIndex)
}

export const options = {
	responsive: true,
	plugins: {
		legend: {
			position: "top",
		},
		title: {
			display: false,
		},
	},
}

const labels_week = getWeekLabels()

const optionStyle = "focus:border-none focus:outline-none"

export const data_week = {
	labels: labels_week,
	datasets: [
		{
			label: "",
			data: labels_week.map(() =>
				faker.number.int({ min: 10, max: 1000 })
			),
			backgroundColor: "#93c5fd",
		},
	],
}

const AdminRevenueChart = () => {
	const [choose, setChoose] = useState("Y")
	const [data, setData] = useState(data_week)

	const getRevenueByYear = async () => {
		try {
			const { labels, revenues } =
				await handleAdmin.GetRevenueByYear(2023)
			const data_year = {
				labels,
				datasets: [
					{
						label: "Doanh thu trong năm",
						data: revenues,
						backgroundColor: "#93c5fd",
					},
				],
			}
			setData(data_year)
		} catch (error) { }
	}

	const getRevenueByWeek = async () => {
		try {
			const { day, revenue } =
				await handleAdmin.GetRevenueByWeek()
			const data_week = {
				labels: day,
				datasets: [
					{
						label: "Doanh thu theo tuần",
						data: revenue,
						backgroundColor: "#93c5fd",
					},
				],
			}

			setData(data_week)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		if (choose === "Y") {
			getRevenueByYear()
		} else if (choose === "W") getRevenueByWeek()
	}, [choose])

	return (
		<>
			<div className='flex justify-between'>
				<div className='text-[1.5rem] font-[700] flex gap-2 items-center'>
					<CiWavePulse1 size={25} /> <h1>Revenue Chart</h1>
				</div>
				<div className=''>
					<select
						id='countries'
						class='bg-white focus:outline-none focus:border-none 
             border text-[1.1rem] text-black rounded-lg 
              block w-full p-2.5 '
						onChange={(e) => {
							setChoose(e.target.value)
						}}
					>
						<option className={optionStyle} value='Y'>
							Year
						</option>

						<option className={optionStyle} value='W'>
							Week
						</option>
					</select>
				</div>
			</div>
			<Line options={options} data={data} />
		</>
	)
}

export default AdminRevenueChart
