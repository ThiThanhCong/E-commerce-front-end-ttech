"use client"

import { handleProduct } from "@/app/api/handleProduct"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import useDebounce from "@/customHook/useDeboune"

const ProductRenderList = ({
	currentProductChoose,
	setCurrentProductChoose,
	filter,
	list,
	setList,
}) => {
	return (
		<ul className='w-[25%] customScrollBar divide-y py-2 flex flex-col gap-2 h-[350px] overflow-y-scroll p-2'>
			{list?.map((x, i) => (
				<motion.li
					key={i}
					variants={variants}
					initial='initial'
					animate={
						currentProductChoose?.product_id ===
							x?.product_id
							? "animate"
							: "initial"
					}
					onClick={() => {
						setCurrentProductChoose(x),
							console.log(currentProductChoose)
					}}
					className='flex items-start gap-2 p-2 cursor-pointer rounded-2xl'
				>
					<div className='w-12 h-12 shrink-0 rounded-xl bg-sky-300'>
						<img
							src={x?.image[0]?.image_path}
							className='w-full h-full object-cover rounded-xl'
						/>
					</div>
					<div className='text-[1.4rem] whitespace-nowrap overflow-hidden text-ellipsis'>
						{x?.name_pr}
					</div>
				</motion.li>
			))}
		</ul>
	)
}

export default ProductRenderList

const variants = {
	initial: {
		opacity: 0.6,
		backgroundColor: "white",
	},
	animate: {
		opacity: 1,
		backgroundColor: "#e0f2fe",
		transition: {
			delay: 0.2,
		},
	},
}
