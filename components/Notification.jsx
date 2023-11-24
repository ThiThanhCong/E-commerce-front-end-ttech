import {
	AnimatePresence,
	motion,
} from "framer-motion"
import { useEffect } from "react"

const notificationVariants = {
	initial: {
		opacity: 0,

		transition: { duration: 0.1 },
	},
	animate: {
		opacity: 1,
	},
	exit: {
		opacity: 0,

		transition: { ease: "easeOut", duration: 0.15 },
	},
	hover: {
		transition: { duration: 0.1 },
	},
}

const Notification = ({
	notifications,
	setNotifications,
	notification,
}) => {
	const { text, style } = notification

	useEffect(() => {
		const timmer = setTimeout(() => {
			setNotifications(false)
		}, 2000)

		return () => clearTimeout(timmer)
	}, [])

	const styleType = () => {
		// Controlled by selection menu
		switch (style) {
			case "success": {
				return "bg-gradient-to-r from-cyan-500 to-blue-500"
			}

			case "error":
				return {
					background:
						"linear-gradient(15deg, #ff596d, #d72c2c)",
				}
			case "warning":
				return {
					background:
						"linear-gradient(15deg, #ffac37, #ff9238)",
				}
			case "light":
				return {
					background:
						"linear-gradient(15deg, #e7e7e7, #f4f4f4)",
				}
			default:
				return {
					background:
						"linear-gradient(15deg, #202121, #292a2d)",
				}
		}
	}

	return (
		<>
			<motion.div
				positionTransition
				variants={notificationVariants} // Defined animation states
				whileHover='hover' // Animation on hover gesture
				initial='initial' // Starting animation
				animate='animate' // Values to animate to
				exit='exit' // Target to animate to when removed from the tree
				className={`fixed bottom-10 right-1/2 translate-x-1/2  text-white p-2 z-50 rounded-xl ${styleType()}`}
			>
				<div
					className='p-2  items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex'
					role='alert'
				>
					<span className='flex rounded-full uppercase px-2 py-1 text-xs font-bold mr-3'>
						New
					</span>
					<span className='font-semibold mr-2 text-left text-2xl flex-auto'>
						{text}
					</span>
					<svg
						class='fill-current opacity-75 h-4 w-4'
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 20 20'
					>
						<path d='M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z' />
					</svg>
				</div>
			</motion.div>
		</>
	)
}

export default Notification
