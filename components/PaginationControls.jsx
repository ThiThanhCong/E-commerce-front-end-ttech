"use client"

import {
	useRouter,
	useSearchParams,
} from "next/navigation"
import { motion } from "framer-motion"

const PaginationControls = ({
	onPageChange,
	totalPages,
	currentPage,
}) => {
	const router = useRouter()

	return (
		<div className='flex justify-center gap-2 mb-10 items-center'>
			<motion.button
				whileHover={{
					backgroundColor: "rgb(239 68 68)",
					marginRight: 10,
					scale: 1.1,
				}}
				animate={{
					backgroundColor:
						currentPage - 1 <= 0
							? "rgb(107 114 128)"
							: "rgb(59 130 246)",
				}}
				disabled={currentPage - 1 <= 0}
				className={`text-[1.5rem] rounded-full px-4 text-white p-1`}
				onClick={() => {
					onPageChange(currentPage - 1)
				}}
			>
				prev page
			</motion.button>

			<div className='text-2xl '>
				{currentPage} / {totalPages}
			</div>

			<motion.button
				whileHover={{
					backgroundColor: "rgb(239 68 68)",
					marginLeft: 10,
					scale: 1.1,
				}}
				animate={{
					backgroundColor:
						currentPage + 1 > totalPages
							? "rgb(107 114 128)"
							: "rgb(59 130 246)",
				}}
				disabled={currentPage + 1 > totalPages}
				className={`text-[1.5rem] rounded-full px-4 text-white p-1`}
				onClick={() => {
					onPageChange(currentPage + 1)
				}}
			>
				next page
			</motion.button>
		</div>
	)
}

export default PaginationControls
