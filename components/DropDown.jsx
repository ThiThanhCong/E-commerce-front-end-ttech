"use client"
import {
	AnimatePresence,
	motion,
} from "framer-motion"
import { useState } from "react"
import { CiCircleChevRight } from "react-icons/ci"

const DropDown = ({ title, links }) => {
	const [show, setShow] = useState(false)
	return (
		<motion.div className='py-2 cursor-pointer'>
			<div
				onClick={() => setShow((pre) => !pre)}
				className='flex items-center justify-between'
			>
				<h4 className=' text-[1.5rem]'>{title}</h4>
				<motion.div
					animate={{ rotate: show ? 90 : 0 }}
				>
					<CiCircleChevRight size={20} />
				</motion.div>
			</div>
			<AnimatePresence>
				{show && (
					<motion.ul
						initial={{
							opacity: 0,
							scaleY: 0,
							height: 0,
							padding: 0,
						}}
						animate={{
							opacity: 1,
							scaleY: 1,
							padding: 2,
							height: "auto",
						}}
						exit={{
							opacity: 0,
							scaleY: 0,
							height: 0,
							padding: 0,
						}}
						transition={{ duration: 0.2 }}
						className='flex flex-col origin-top '
					>
						{links.map(({ text, href }, i) => (
							<motion.li
								key={i}
								className='text-[1.3rem] text-black/90 font-[300]'
							>
								{text}
							</motion.li>
						))}
					</motion.ul>
				)}
			</AnimatePresence>
		</motion.div>
	)
}

export default DropDown
