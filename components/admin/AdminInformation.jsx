"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { CiBellOn } from "react-icons/ci"

const AdminInformation = () => {
	const [showList, setShowList] = useState(false)
	const listRef = useRef(null)

	useEffect(() => {
		let timer;
		const listElement = listRef.current;

		const handleMouseLeave = () => {
			timer = setTimeout(() => {
				setShowList(false);
			}, 2000);
		};

		const handleMouseEnter = () => {
			clearTimeout(timer);
		};

		if (listElement) {
			listElement.addEventListener("mouseleave", handleMouseLeave);
			listElement.addEventListener("mouseenter", handleMouseEnter);
		}

		return () => {
			if (listElement) {
				listElement.removeEventListener("mouseleave", handleMouseLeave);
				listElement.removeEventListener("mouseenter", handleMouseEnter);
			}
			clearTimeout(timer);
		};
	}, [showList]);


	return (
		<div className='fixed right-10 top-5 z-10 w-[200px]'>
			<div className='flex right-0 absolute items-center'>
				<div
					onClick={() => setShowList((pre) => !pre)}
					className='relative flex items-center bg-gradient-to-bl from-pink-400 to-pink-700 rounded-2xl p-2 text-white'
				>
					<div className='text-black text-center absolute top-0 left-0 w-6 -translate-x-1 -translate-y-1 h-6 bg-white/20 backdrop-blur-md  rounded-xl'>
						{informationList.length}
					</div>
					<motion.div
						whileHover={{ rotate: [0, 30, 0, -30, 0] }}
						transition={{ duration: 0.5 }}
						className='flex origin-[50%_0%]'
					>
						{" "}
						<CiBellOn size={18} />
					</motion.div>
				</div>
			</div>

			{/* Information List */}
			<AnimatePresence>
				{showList && (
					<motion.div
						ref={listRef}
						initial={{
							y: "-100%",
							scaleY: 0,
							opacity: 0,
						}}
						animate={{ y: 0, scaleY: 1, opacity: 1 }}
						exit={{ y: "-100%", scaleY: 0, opacity: 0 }}
						className='absolute border-black/10 p-6 bg-white/20 backdrop-blur-sm top-[2.5rem] border rounded-3xl'
					>
						<div className='text-[2rem] mb-2 font-[700] flex justify-between items-center'>
							<div>Thông báo</div>{" "}
							<div
								onClick={() => setShowList(false)}
								className='rounded-full w-5 h-5 -translate-y-3 bg-red-600'
							></div>
						</div>
						<motion.ul className='text-[1.5rem] flex flex-col divide-y '>
							{informationList.map((x, i) => (
								<li
									className='flex gap-4 align-top justify-start py-2'
									key={i}
								>
									<div className='bg-green-300 w-[10px] h-[10px] rounded-2xl shrink-0'></div>
									<div className='text-[1.4rem]'>{x}</div>
								</li>
							))}
						</motion.ul>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

export default AdminInformation

const informationList = [
	"Sang vừa đặt một sản phẩm ",
	"Công vừa đặt máy run công suất lớn",
	"Kiệt vừa cúp học",
	"Toàn vừa rủ Công chơi cầu trượt",
]
