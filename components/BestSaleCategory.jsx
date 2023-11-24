"use client"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import {
	CiDesktop,
	CiDesktopMouse2,
	CiHardDrive,
	CiHeadphones,
	CiKeyboard,
	CiLaptop,
	CiMobile2,
	CiStreamOn,
} from "react-icons/ci"

const BestSaleCategory = () => {
	const router = useRouter()
	return (
		<div className='hidden md:flex justify-center gap-[30px] lg:gap-[60px] items-start my-10'>
			{categoryBestSeller.map((x, i) => (
				<motion.div
					onClick={() => {
						router.push(
							"/products?" + "categoryId=" + x.categoryId
						)
					}}
					initial={{ color: "black" }}
					whileHover={{ color: "red" }}
					transition={{
						type: "spring",
						duration: 0.3,
					}}
					key={i}
					className='cursor-pointer flex flex-col start items-center'
				>
					<div
						className='shrink-0
       
           min-h-[60px] justify-self-start'
					>
						<x.icon size={45} />
					</div>
					<div
						className='flex flex-col 
          justify-start'
					>
						<h1
							className='capitalize 
            text-center text-[1.5rem] font-[300] leading-4 '
						>
							{x.name}
						</h1>
						<h2
							className='capitalize 
            text-center text-[1.2rem] font-[300] text-red-400 mt-1'
						>
							{x.isNew && "Mới"}
						</h2>
					</div>
				</motion.div>
			))}
		</div>
	)
}

export default BestSaleCategory

const categoryBestSeller = [
	{
		id: 0,
		name: "Điện thoại",
		icon: CiMobile2,
		isNew: false,
		categoryId: "0PbC1aL2mN3oPqR",
	},
	{
		id: 1,
		name: "Chuột",
		icon: CiDesktopMouse2,
		isNew: true,
		categoryId: "x0bC1a2L3mN3oPq",
	},

	{
		id: 2,
		name: "Tai nghe",
		icon: CiHeadphones,
		isNew: false,
		categoryId: "4dEfG6zIjvp7oP8",
	},

	{
		id: 3,
		name: "Laptop",
		icon: CiLaptop,
		isNew: true,
		categoryId: "qRsTuV4wXyZ5678",
	},

	{
		id: 4,
		name: "Màn hình",
		icon: CiDesktop,
		isNew: true,
		categoryId: "4d2fG9zIjv37oP8",
	},

	{
		id: 5,
		name: "Bàn phím",
		icon: CiKeyboard,
		isNew: true,
		categoryId: "4d2229zzjv37oP8",
	},

	{
		id: 6,
		name: "Ổ cứng",
		icon: CiHardDrive,
		isNew: true,
		categoryId: "x0bC1a2L3mN3oPq",
	},

	{
		id: 7,
		name: "Smart home",
		icon: CiStreamOn,
		isNew: true,
		categoryId: "7qRsTuVwXyZ5678",
	},
]
