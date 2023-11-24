"use client"

import { AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { CiFilter, CiPercent } from "react-icons/ci"
import { convertToVND } from "@/utils/until"
import { useRouter, useSearchParams } from "next/navigation"

const FilterProduct = ({ onFilterChange, filter }) => {
	const searchParams = useSearchParams()
	const [show, setShow] = useState(false)

	const [priceRange, setPriceRange] = useState({
		minPrice: 0,
		maxPrice: 999_999_999,
	})

	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === "Escape") {
				setShow(false)
			}
		}

		window.addEventListener("keydown", handleKeyDown)

		return () => {
			window.removeEventListener("keydown", handleKeyDown)
		}
	}, [])

	const onPriceRangeChange = (e) => {
		const { value, id } = e.target
		setPriceRange((pre) => ({
			...pre,
			[id]: value,
		}))
	}

	const handlePriceRangeClick = (e) => {
		const from = Number.parseInt(priceRange.minPrice) || 0
		const to =
			Number.parseInt(priceRange.maxPrice) || 999_999_999

		onFilterChange((pre) => ({
			...pre,
			minPrice: from,
			maxPrice: to,
		}))

		setShow(false)
	}

	return (
		<div>
			<div className='flex gap-5 mt-24 mb-10 items-center justify-center'>
				<div
					onClick={() => {
						setShow(true)
					}}
					className='flex cursor-pointer gap-2 items-center justify-center mx-[20px]'
				>
					<CiFilter
						size={30}
						color='white'
						className='bg-blue-500 p-1 rounded-2xl'
					/>
					<div>
						<h1 className='text-2xl text-black/70 font-[400]'>
							Sử dụng tính năng lọc <br></br> để tìm ra{" "}
							<span className='text-black'>
								sản phẩm ưng ý nhất
							</span>
						</h1>
					</div>
				</div>

				<div
					className='flex justify-center gap-2 items-center'
					onClick={() => { }}
				>
					<CiPercent
						className='bg-red-500 px-2 py-1 rounded-2xl'
						color='white'
						size={30}
					/>
					<h1 className='text-2xl text-black/70  font-[400]'>
						Ưu đãi ngập tràng, <br></br> khuyễn mại đến 60%
					</h1>
				</div>
			</div>

			<AnimatePresence>
				{show && (
					<motion.div
						initial={{ scaleY: 0 }}
						whileInView={{ scaleY: 1 }}
						exit={{ scaleY: 0 }}
						transition={{
							duration: 0.4,
							type: "spring",
						}}
						className='fixed inset-0 z-30 origin-top'
					>
						<div className='absolute top-0 bottom-40 inset-x-0 bg-white z-40 grid grid-cols-2 '>
							{filterData.map((x, i) => (
								<div key={i} className='text-center mt-36'>
									<h1 className='text-5xl font-bold'>{x.name}</h1>
									<div className='mt-5'>
										{x.filter.map((y, j) => (
											<div key={j}>
												<motion.div
													variants={variant}
													initial='init'
													whileTap='tap'
													onClick={() => {
														const category_id =
															searchParams.get("categoryId")

														onFilterChange(() => {
															if (x.id == 1) {
																return category_id
																	? {
																		...filter,
																		SortBy: "price",
																		IsDescending: y.type === "Desc",
																		categoryId: category_id,
																	}
																	: {
																		...filter,
																		SortBy: "price",
																		IsDescending: y.type === "Desc",
																	}
															}
														})
													}}
													className='text-2xl cursor-pointer'
												>
													{y.name}
												</motion.div>
											</div>
										))}
									</div>
								</div>
							))}

							<div className='mt-36'>
								<h1 className='text-5xl font-bold'>Khoảng giá</h1>
								<form
									className='flex flex-col items-start mt-5'
									onSubmit={(e) => e.preventDefault()}
								>
									{[
										{
											name: "Từ",
											key: "minPrice",
											placeholder: convertToVND(0),
										},
										{
											name: "Đến",
											key: "maxPrice",
											placeholder: convertToVND(9999999),
										},
									].map((x, i) => (
										<div
											key={i}
											className='flex items-center text-2xl gap-2'
										>
											<label htmlFor={x.key} className='min-w-[40px]'>
												{x.name}
											</label>
											<input
												onChange={(e) => onPriceRangeChange(e)}
												value={priceRange[x.key]}
												id={x.key}
												placeholder={x.placeholder}
											/>
											<h1 className='text-black/40 font-[400] text-xl'>
												{convertToVND(
													Number.parseInt(priceRange[x.key]) || 0
												)}
											</h1>
										</div>
									))}

									<button
										onClick={handlePriceRangeClick}
										className='px-4 text-white text-2xl mt-4 bg-blue-500 rounded-full  py-1 '
									>
										Xác nhận
									</button>
								</form>
							</div>

							<div className='absolute hidden sm:block bottom-10 left-1/2 z-40 text-2xl -translate-x-1/2'>
								Pres{" "}
								<span className='bg-blue-500 px-2 py-1 text-white rounded-2xl'>
									ESC
								</span>{" "}
								to quit
							</div>
						</div>
						<div
							onClick={() => {
								setShow(false)
							}}
							className='bg-white/20  backdrop-blur-md absolute inset-0'
						></div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

export default FilterProduct

const filterData = [
	{
		id: 1,
		name: "Giá",
		filter: [
			{
				id: 1,
				name: "Từ thấp đến cao",
				type: "Asc",
			},
			{
				id: 2,
				name: "Từ cao đến thấp",
				type: "Desc",
			},
		],
	},
]

const variant = {
	init: {
		opacity: 1,
	},
	tap: {
		color: "red",
	},
}