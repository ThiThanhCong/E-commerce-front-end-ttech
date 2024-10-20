import { handleAdmin } from "@/app/api/handleAdmin"
import { UserAuth } from "@/context/AuthContext"
import { useEffect, useState } from "react"
import { CiShoppingBasket, CiUser } from "react-icons/ci"

const CountingInfor = () => {
	const [infor, setInfor] = useState({
		user: 0,
		order: 0,
	})
	const getTotalInfor = async () => {
		try {
			const user = await handleAdmin.GetTotalCustomer()
			const order = await handleAdmin.GetTotalOrder()

			setInfor({
				user,
				order,
			})
		} catch (error) { }
	}
	useEffect(() => {
		getTotalInfor()
	}, [])
	return (
		<div className='flex flex-1 gap-4 '>
			<div className=' bg-gradient-to-tl from-blue-300 to-blue-600 rounded-2xl p-5 flex-col justify-center gap-5 flex flex-1 text-white'>
				<div>
					<CiUser size={30} />
				</div>
				<div>
					<div className='text-[1.1rem] capitalize leading-8 mb-1'>
						Tổng người dùng
					</div>
					<div className='font-[700] text-[2.5rem]'>
						{infor?.user}
					</div>
				</div>
			</div>
			<div className=' rounded-2xl bg-gradient-to-tr from-blue-300 to-blue-600 p-5 flex-col justify-center gap-5 flex flex-1 text-white'>
				<div>
					<CiShoppingBasket size={30} />
				</div>
				<div>
					<div className='text-[1.1rem] capitalize leading-8 mb-1'>
						Tổng đơn hàng
					</div>
					<div className='font-[700] text-[2.5rem]'>
						{infor?.order}
					</div>
				</div>
			</div>
		</div>
	)
}

export default CountingInfor
