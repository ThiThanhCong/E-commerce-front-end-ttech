"use client"

import { handleProduct } from "@/app/api/handleProduct"
import CircleLoader from "@/components/CircleLoader"
import Notification from "@/components/Notification"
import { UserAuth } from "@/context/AuthContext"
import { UserCart } from "@/context/CartContex"
import {
	convertToVND,
	getCurrentDate,
} from "@/utils/until"
import { AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { handleCart } from "@/app/api/handleCart"
import {
	CiBookmark,
	CiChat1,
	CiDeliveryTruck,
	CiMedal,
} from "react-icons/ci"
import Image from "next/image"
export default function Page({ params }) {
	const [imageList, setImageList] = useState([])
	const [loading, setLoading] = useState(true)
	const { totalProduct, setTotalProduct } =
		UserCart()
	const [notifications, setNotifications] =
		useState(false)
	const product_id = params.id
	const { triggerRerender, setTriggerRerender } = UserCart()
	const router = useRouter()
	const { user, token } = UserAuth();
	const [result, setResult] = useState({
		product: {
			product_id: "IPAD001",
			name_pr: "Apple iPad Air 2020",
			name_serial: "IPAD001",
			detail:
				"10.9-inch Liquid Retina display, A14 Bionic chip, Touch ID, 64GB storage, Wi-Fi",
			price: 14000000,
			quantity_pr: 15,
			guarantee_period: 12,
		},
		category: {
			category_id: "4dEfGhI5jKp6mNoP",
			category_name: "Tablet",
		},
		supplier: {
			supplier_id: "SUPLLIER004",
			supplier_name: "LG",
		},
		image: {
			image_id: "IPAD001001",
			product_id: "IPAD001",
			image_href:
				"https://localhost:7067/Upload/product/IPAD001/IPAD001_1.jpg",
		},
	})
	const handleOnClick = async () => {
		const data = {
			user_id: user?.user_id,
			product_id: product_id,
			quantity: 1,
		}

		console.log("runing.")

		if (!token || !user?.user_id) router.push("/login")

		const result = await handleCart.AddToCart(data, token)
		setTriggerRerender(triggerRerender == 0 ? 1 : 0)
		console.log("result order by product id ", result)
		setNotifications(true)
	}

	const callAPI = useCallback(async () => {
		try {
			const resultFake = await handleProduct.getProducctById(params.id);
			const images = await handleProduct.getAllImageOfProduct(params.id);
			setImageList(images);
			setResult(resultFake.product);
			console.log("this is the result: ", resultFake);
			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	}, [params.id]);

	useEffect(() => {
		callAPI()
	}, [callAPI])

	return (
		<div className='container mx-auto pb-[100px] mt-28'>
			<AnimatePresence>
				{notifications && (
					<Notification
						setNotifications={setNotifications}
						notifications={notifications}
						notification={{
							style: "success",
							text:
								"Sản phẩm đã được thêm vào giỏi hàng của bạn",
						}}
					/>
				)}
			</AnimatePresence>
			<div className='mx-auto w-4/5'>
				<div className='text-[1.9rem] capitalize font-[600] cursor-pointer'>
					{result?.supplier?.supplier_name}
				</div>
				<hr className='bg-black/10 h-[2px]'></hr>

				<div className='flex gap-5 flex-wrap'>
					{loading ? (
						<div className='w-[200px] h-[200px] flex items-center justify-center mt-12 mb-5'>
							<CircleLoader />
						</div>
					) : (
						imageList?.map((x, i) => (
							<div
								key={i}
								className='w-[200px] h-[200px] flex items-center justify-center mt-12 mb-5'
							>
								<Image
									src={x.image_path}
									alt="Description of image"
									className='object-cover rounded-[30px] p-4 block'
									width={500}
									height={300}
									layout="responsive"
								/>
							</div>
						))
					)}
				</div>

				<div>
					<div className='title mt-2'>
						{result?.name_pr}
					</div>
					<div className='text-[1.8rem] font-semibold'>
						{convertToVND(result?.price || 1000)}
					</div>

					<div className='mt-5 text-[2rem] flex items-start  divide-x divide-black/60'>
						<h1 className='flex-1 text-black/70'>
							{result?.detail}
						</h1>
						<h1 className='flex-1 flex items-center gap-2 pl-2'>
							<CiMedal size={25} />
							Cam kết chất lượng với bảo hành{" "}
							<span className='text-red-500'>
								{result?.guarantee_period}
							</span>{" "}
							tháng
						</h1>
					</div>

					<div className='text-[1.6rem] mt-10 w-1/2'>
						Bạn chưa ưng ý sản phẩm lắm? <br></br> Hãy
						nhắn trực tiếp hoặc xem thêm về{" "}
						<span className='font-semibold text-blue-400'>
							{result?.category[0]?.category_name}
						</span>{" "}
						tại{" "}
						<span
							onClick={() => {
								router.push(
									"/products?" +
									"categoryId=" +
									result?.category[0]?.category_id
								)
							}}
							className='text-blue-500 underline cursor-pointer'
						>
							đây
						</span>
					</div>

					<div className='my-24'>
						<div className='flex items-center gap-1'>
							<CiDeliveryTruck size={25} />
							<div className='text-[1.4rem]'>
								Giao hàng ngay trong hôm nay{" "}
							</div>
						</div>
						<span className='text-[1.5rem] font-semibold'>
							{getCurrentDate("/")} - Miễn phí
						</span>
					</div>
					<div>
						<div className='my-24'>
							<button
								onClick={handleOnClick}
								className='w-full p-2 rounded-xl text-white text-[1.7rem] bg-blue-500 flex items-center justify-center'
							>
								Đặt hàng ngay
							</button>
						</div>
						<div className='my-24'>
							<div className='text-[1.5rem] font-semibold'>
								Đang phân vân ra quyết định
							</div>

							<div className='text-[1.3rem]'>
								Lưu vào danh sách một cách dễ dàng và quay
								lại xem sau đó
							</div>

							<div className='flex gap-2  text-blue-500 items-center'>
								<CiBookmark size={20} />
								<span className=' text-[1.4rem] underline cursor-pointer'>
									lưu vào danh sách xem sau
								</span>
							</div>
						</div>
					</div>
				</div>

				<div className='flex items-center gap-2 text-[1.5rem]'>
					<CiChat1 size={20} />
					Chat ngay với hệ thống, hoặc liên hệ hotline
					09009090
				</div>
			</div>
		</div>
	)
}
