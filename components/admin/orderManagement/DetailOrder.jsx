import { handleDetailOrder } from "@/app/api/handleDetailOrder"
import { handleOrder } from "@/app/api/handleOrder"
import Notification from "@/components/Notification"
import { useEffect, useState } from "react"
import { CiMinimize1 } from "react-icons/ci"
import Image from "next/image"
const DetailOrder = ({
	currentOrderClick,
	setCurrentOrderClick,
	setTrigger,
}) => {
	const [data, setData] = useState({
		state: currentOrderClick?.state,
	})
	const [notifications, setNotifications] = useState(false)

	const [orderDetailList, setOrderDetailList] = useState([])

	const handleValueChange = (e) => {
		const { id, value } = e.target
		if (id === "state") {
			setData((pre) => ({ ...pre, [id]: value }))
		}
	}

	const getOrderDetailByOrderId = useCallback(async () => {
		const orderId = currentOrderClick.order_id;
		const result = await handleDetailOrder.getOrderDetailByOrderId(orderId);
		setOrderDetailList(result);
	}, [currentOrderClick]);

	useEffect(() => {
		getOrderDetailByOrderId()
	}, [getOrderDetailByOrderId])

	const handleSubmit = async () => {
		const orderId = currentOrderClick.order_id;
		const State = data.state;
		const realData = {
			order_id: orderId,
			state: State
		};

		await handleOrder.updateStateOrder(realData)

		setCurrentOrderClick({})
		setTrigger((pre) => !pre)
	}

	return (
		<div className='container mx-auto'>
			{notifications && (
				<Notification
					notifications={notifications}
					setNotifications={setNotifications}
					notification={{
						text: "Cập nhật thành công",
						style: "success",
					}}
				/>
			)}
			<div className='flex justify-between mt-10'>
				<h1 className='text-4xl capitalize font-[700]'>
					Chi tiết hóa đơn
				</h1>

				<div onClick={() => setCurrentOrderClick({})}>
					<CiMinimize1 size={20} />
				</div>
			</div>
			<div className='flex mt-5 h-[500px]'>
				<form
					onSubmit={(e) => e.preventDefault()}
					className='grow-[2] shrink-0 text-2xl'
				>
					<select
						id='state'
						onChange={handleValueChange}
						className='w-full'
					>
						{state.map((x, i) => (
							<option
								value={x}
								key={i}
								selected={x === currentOrderClick.state}
							>
								{x}
							</option>
						))}
					</select>
					<button
						className='bg-blue-500 w-full mt-2 text-white py-1 px-2 rounded-3xl'
						onClick={handleSubmit}
					>
						Xác nhận
					</button>
				</form>
				<div className='grow-[5] text-2xl shrink-0 flex flex-wrap'>
					{orderDetailList?.map((x, i) => (
						<div
							className='flex flex-col items-center gap-4'
							key={i}
						>
							<div className='w-[200px] h-[200px]'>
								<Image
									src={x.product.image[0]?.image_path}
									alt="Product Image"
									layout="responsive"
									width={500}
									height={500}
									className='object-cover'
								/>
							</div>
							<h1 className='w-[150px] overflow-ellipsis whitespace-nowrap text-center'>
								{x.product.name_pr.slice(0, 20)}...
							</h1>
							<h2 className='px-2 text-white bg-blue-500 font-bold'>
								{x.quantity}
							</h2>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default DetailOrder

const state = [
	"Pending",
	"Completed",
	"Cancelled",
	"Banked",
]
