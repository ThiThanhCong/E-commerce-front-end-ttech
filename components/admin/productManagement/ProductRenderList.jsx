"use client"

import { motion } from "framer-motion"
import Image from "next/image"
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
						<Image
							src={x?.image[0]?.image_path}
							alt="Image"
							layout="responsive"
							width={500}
							height={500}
							className='rounded-xl object-cover'
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
