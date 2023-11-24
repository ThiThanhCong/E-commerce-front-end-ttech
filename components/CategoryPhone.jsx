"use client"
import {
	AnimatePresence,
	motion,
} from "framer-motion"
import { useState } from "react"
import {
	CiMenuBurger,
	CiMinimize1,
} from "react-icons/ci"
import ProductListCategoryOnPhone from "./ProductListCategoryOnPhone"
const CategoryPhone = () => {
	const [showCategory, setShowCategory] =
		useState(false)

	return (
		<div>
			<motion.div
				whileHover={{ scale: 1.1 }}
				onClick={() => setShowCategory(true)}
			>
				<CiMenuBurger size={20} />
			</motion.div>
			<AnimatePresence>
				{showCategory && (
					<motion.div
						initial={{
							y: "-100%",
							scaleY: 0,
							opacity: 0,
						}}
						animate={{ y: 0, scaleY: 1, opacity: 1 }}
						exit={{ y: "-100%", scaleY: 0, opacity: 0 }}
						transition={{ type: "tween" }}
						className='absolute font-[300] h-[100vh] z-40 inset-0 p-10 bg-[#EFEFF1]'
					>
						<motion.div
							whileInView={{ scaleY: [0, 1] }}
							className='flex flex-col origin-top items-center '
						>
							<motion.div
								onClick={() => {
									setShowCategory(false)
								}}
								className='flex justify-end w-full'
							>
								<motion.div whileHover={{ scale: 1.1 }}>
									<CiMinimize1 size={20} color='black' />
								</motion.div>
							</motion.div>
							<ProductListCategoryOnPhone />
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

export default CategoryPhone
