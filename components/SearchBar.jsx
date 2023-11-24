"use client"

import { handleProduct } from "@/app/api/handleProduct"
import useDebounce from "../customHook/useDeboune"
import { productNameExample } from "../data"
import { convert_vi_to_en } from "../utils/until"
import { AnimatePresence, motion } from "framer-motion"
import {
	usePathname,
	useRouter,
	useSearchParams,
} from "next/navigation"
import { useEffect, useState } from "react"
import { CiMinimize1, CiSearch } from "react-icons/ci"

const SearchBar = () => {
	const [showSearchPage, setShowSearchPage] = useState(false)
	const [value, setValue] = useState("")
	const router = useRouter()
	const [filteredProducts, setFilteredProducts] = useState(
		[]
	)

	const debouncedValue = useDebounce(value, 500)
	//

	const getProductBySearchParam = async () => {
		const result =
			await handleProduct.getProduct(
				{
					searchKey: debouncedValue
				}
			)
		setFilteredProducts(result?.Products)
	}

	useEffect(() => {
		getProductBySearchParam()
	}, [debouncedValue])

	const handleKeyPressEnter = (e) => {
		if (e.key === "Enter") {
			router.push(`/products?searchKey=${value}`)
			setShowSearchPage(false)
		}
	}

	useEffect(() => {
		const handleKeyPress = (event) => {
			if (event.key === "Escape") {
				setShowSearchPage(false)
			}
		}

		window.addEventListener("keydown", handleKeyPress)

		return () => {
			window.removeEventListener("keydown", handleKeyPress)
		}
	}, [])

	return (
		<div>
			<AnimatePresence>
				{showSearchPage && (
					<motion.div
						initial={{
							y: "-100%",
							scaleY: 0,
							opacity: 0,
						}}
						animate={{ y: 0, scaleY: 1, opacity: 1 }}
						exit={{ y: "-100%", scaleY: 0, opacity: 0 }}
						className=' absolute h-[100vh]  inset-0 backdrop-blur-2xl text-black origin-top'
						transition={{ type: "tween" }}
					>
						<div className='absolute z-40  inset-x-0 top-0 bottom-0 md:bottom-[90px] bg-[#efeff1]'>
							<motion.div
								whileInView={{ scaleY: [0, 1] }}
								transition={{ delay: 0.1 }}
								className='flex flex-col w-[60%] mt-[10%] mx-auto items-center origin-top'
							>
								<div className='flex items-center gap-2 justify-between  w-full'>
									<motion.form
										onSubmit={(e) => e.preventDefault()}
										className='flex items-center w-full gap-2 justify-start'
									>
										<CiSearch size={20} />
										<motion.input
											autoFocus
											placeholder='Tìm Kiếm'
											value={value}
											onKeyPress={handleKeyPressEnter}
											onChange={(e) => {
												setValue(e.target.value)
											}}
											type='text'
											className='outline-none bg-[#efeff1] w-full text-[2rem] font-semibold '
										/>
									</motion.form>

									<motion.div
										whileHover={{ scale: 1.1 }}
										onClick={() => setShowSearchPage(false)}
									>
										<CiMinimize1 size={20} />
									</motion.div>
								</div>

								<div
									className='w-full mt-10 
                flex flex-col justify-start items-start'
								>
									{filteredProducts?.slice(0, 6)?.map((x, i) => (
										<motion.h1
											onClick={() => {
												router.push("/products/" + x?.product_id)
												setShowSearchPage(false)
											}}
											whileHover={{ color: "#dc2626" }}
											key={i}
											className='text-black text-[2rem] font-[700] cursor-pointer'
										>
											{x?.name_pr}
										</motion.h1>
									))}
								</div>
							</motion.div>
						</div>

						<motion.div
							whileInView={{ opacity: [0, 1] }}
							onClick={() => setShowSearchPage(false)}
							className='absolute inset-0 bg-black/50 backdrop-blur-3xl'
						></motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			<div className='items-center w-full flex justify-end'>
				<motion.div
					whileHover={{ scale: 1.1, color: "#dc2626" }}
					onClick={() => {
						setShowSearchPage((pre) => !pre)
					}}
					className='cursor-pointer'
				>
					<CiSearch size={22} />
				</motion.div>
			</div>
		</div>
	)
}

export default SearchBar

/**
 * % ĐÓNG GÓP
 * + (NỘP DEADLINE ĐÚNG HẠNG) (- ĐIỂM ĐÓNG GÓP, TRỄ 1H -> 10H)
 * + ĐỘ UY TÍN, PHẦN LÀM CÓ PHẢI LÀ CHO CÓ ĐỐI PHÓ
 * +
 * + TIẾN ĐỘ TỪNG THÀNH VIÊN, GÓP Ý -> SỬA, NỘI QUY CHUNG NHÓM.
 *
 *
 */
