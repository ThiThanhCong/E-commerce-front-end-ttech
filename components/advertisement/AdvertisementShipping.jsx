import { motion } from "framer-motion"
import {
	CiChat2,
	CiDeliveryTruck,
	CiMoneyBill,
} from "react-icons/ci"

const AdvertisementShippingItem =
	"text-[3rem] lg:text-[3.5rem] lg:min-h-[160px] shrink-0 font-[700]"

const AdvertisementShipping = () => {
	return (
		<motion.div
			initial='offscreen'
			whileInView='onscreen'
			transition={{
				type: "spring",
				staggerChildren: 0.1,
			}}
			className='md:grid grid-cols-1 
        lg:grid-cols-3 w-3/5 mx-auto 
        md:w-[auto]  py-20 gap-20 md:mx-[200px]'
		>
			<motion.div
				variants={Animate}
				className='flex flex-col 
          items-center text-center'
			>
				<div className={AdvertisementShippingItem}>
					Mua sắm không giới hạn cùng T-Tech
				</div>
				<CiMoneyBill size={30} />
				<div
					className='font-[400]
           text-[1.6rem] lg:text-[2rem]
            gap-2 flex items-center'
				>
					Với gói dịch vụ mua trước trả sau vỡi lãi
					suất 0% -{" "}
				</div>
				<h3
					className='text-[1.5rem]
           lg:text-[1.8rem] text-blue-500
            underline cursor-pointer'
				>
					Tìm hiểu thêm
				</h3>
			</motion.div>

			<motion.div
				variants={Animate}
				className='flex flex-col 
          items-center text-center'
			>
				<div className={AdvertisementShippingItem}>
					Chờ đợi là hạnh phúc ?{" "}
					<span className='bg-green-500'>Không!</span>
				</div>
				<CiDeliveryTruck size={30} />
				<div
					className='font-[400] 
          text-[1.6rem] lg:text-[2rem]
          gap-2 flex items-center'
				>
					Giao hàng nhanh trong vòng 2h với các khu vực
					nội thành TP.HCM -
				</div>
				<h3
					className='text-[1.5rem]
          lg:text-[1.8rem] text-blue-500
           underline cursor-pointer'
				>
					Tìm hiểu thêm
				</h3>
			</motion.div>

			<motion.div
				variants={Animate}
				className='flex flex-col items-center text-center'
			>
				<div className={AdvertisementShippingItem}>
					Ở ngay bên bạn mỗi khi cần
				</div>
				<CiChat2 size={30} />
				<div className='font-[400] text-[1.6rem] lg:text-[2rem] gap-2 flex items-center'>
					Nhắn ngay cho Chuyên gia hoặc hotline
					09090909 từ 7h sáng đến 17h mỗi ngày.
				</div>
			</motion.div>
		</motion.div>
	)
}

export default AdvertisementShipping

export const Animate = {
	offscreen: {
		x: 20,
		opacity: 0,
	},
	onscreen: {
		x: 0,
		opacity: 1,
		transition: {
			type: "spring",
			bounce: 0.4,
			duration: 0.5,
		},
	},
}
