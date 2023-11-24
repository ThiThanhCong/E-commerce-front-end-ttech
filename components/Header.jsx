"use client"

import { handleCategory } from "@/app/api/handleCategory"
import { UserAuth } from "@/context/AuthContext"
import { motion } from "framer-motion"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { CiUser } from "react-icons/ci"
import Cart from "./Cart"
import CategoryPhone from "./CategoryPhone"
import SearchBar from "./SearchBar"
const Header = () => {
	const [category, setCategory] = useState([])
	const { user, setUser } = UserAuth()
	const { token, setToken } = UserAuth();

	// useEffect(() => {
	// 	setUser(JSON.parse(localStorage.getItem('user')))
	// 	console.log("runned");
	// 	setToken(JSON.parse(localStorage.getItem('token')))
	// }, [])
	const getAllCategory = async () => {
		try {
			const result = await handleCategory.getAllCategories()
			console.log(result)
			setCategory(result)
		} catch (error) {
			console.log(error)
		}
	}

	const handleOnClick = () => {
		if (user?.user_id) {
			router.push("/account")
			return
		}
		router.push("/login")
	}

	useEffect(() => {
		getAllCategory()
	}, [])
	const router = useRouter()

	return (
		<div className='fixed top-0 z-30 inset-x-0 px-10 h-[50px] bg-white/20 backdrop-blur-md'>
			<div className='mx-3 mt-3'>
				<div className='flex w-full items-center gap-[10px] justify-evenly '>
					<div className='lg:hidden p-2'>
						<CategoryPhone />
					</div>
					<div
						onClick={() => router.push("/")}
						className='shinks-0'
					>
						<Image
							alt=''
							src={"/images/1x/Asset1.png"}
							width={81.081081}
							height={20}
						/>
					</div>

					<ul className='hidden md:flex overflow-x-scroll flex-nowrap noneScrollBar my-2'>
						<motion.li
							whileHover={{ color: "red" }}
							onClick={() =>
								router.push(
									"/products?IsDescending=false&pageNumber=1&pageSize=12"
								)
							}
							className='text-[1.3rem] font-[300] capitalize mx-2 text-black/80 cursor-pointer whitespace-nowrap	'
						>
							All
						</motion.li>

						{category?.map((category, index) => (
							<motion.li
								whileHover={{ color: "red" }}
								key={index}
								onClick={() => {
									router.push(
										"/products?" +
										"categoryId=" +
										category?.category_id
									)
								}}
								className='text-[1.3rem] font-[300] capitalize mx-2 text-black/80 cursor-pointer whitespace-nowrap	'
							>
								{category.category_name}
							</motion.li>
						))}
					</ul>

					<motion.div className='grow-[1] '>
						<SearchBar />
					</motion.div>
					<motion.div className=' p-2 '>
						<Cart />
					</motion.div>

					<motion.div
						onClick={handleOnClick}
						whileHover={{ color: "#dc2626" }}
						className='md:block cursor-pointer'
					>
						<CiUser size={25} />
					</motion.div>
				</div>
			</div>
		</div>
	)
}

export default Header