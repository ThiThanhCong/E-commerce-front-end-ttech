"use client"

import { useRouter } from "next/navigation"
import {
	CiShoppingCart,
	CiStar,
} from "react-icons/ci"
import Advertisement from "./Advertisement"
import BestSaleCategory from "./BestSaleCategory"
import ImageSlide from "./ImageSlide"
import ProductListAbs from "./ProductListAbs"
import RealTimeMessage from "./RealTimeMessage"
import AdvertisementShipping from "./advertisement/AdvertisementShipping"
import Image from "next/image"
import { UserAuth } from "@/context/AuthContext"

const MainContent = () => {
	const { user } = UserAuth();
	const router = useRouter()
	const openURL = (string) => {
		router.push("/" + string)
	}
	return (
		<div>
			<RealTimeMessage />

			<div className='m-2 '>
				<div className='md:flex gap-5'>
					<div className='md:grid grid-cols-8'>
						<div className='col-span-1 cursor-pointer hidden md:block mt-10 ml-10'>
							<div
								onClick={() => openURL("products")}
								className='bg-gray-500/10 rounded-3xl p-6'
							>
								<Image
									src={
										"/images/product_images/Laptop_01.png"
									}
									width={0}
									height={0}
									sizes='100vw'
									className='w-[100%] h-auto'
								/>
								<h1 className='text-3xl text-center font-[600] p-4 leading-[18px]'>
									Xem toàn bộ sản phẩm
								</h1>
							</div>

							<div
								onClick={() => openURL("upcomming")}
								className='bg-gray-500/10 rounded-3xl p-6 mt-10'
							>
								<Image
									src={
										"/images/product_images/LocationPin_01.png"
									}
									width={0}
									height={0}
									sizes='100vw'
									className='w-[100%] h-auto p-[10px]'
								/>
								<h1 className='text-3xl text-center font-[600] p-4 leading-[18px]'>
									Tìm cửa hàng ở gần bạn
								</h1>
							</div>
						</div>
						<div className='col-span-6'>
							<ImageSlide />
							<BestSaleCategory />
						</div>
						<div className='col-span-1 hidden md:block mt-10 mr-10 '>
							<div className='bg-gray-500/10 rounded-3xl p-6'>
								<Image
									src={
										"/images/product_images/Gamepad_01.png"
									}
									width={0}
									height={0}
									sizes='100vw'
									className='w-[100%] h-auto'
								/>
								<h1 className='text-3xl text-center font-[600] p-4 leading-[18px]'>
									Chiến game với setup mượt mà. Sẵn ngay.
								</h1>
							</div>
							{user?.role === "admin" && (
								<div
									onClick={() => {
										router.push("/admin")
									}}
									className='bg-gray-500/10 cursor-pointer mt-10 rounded-3xl p-6'
								>
									<Image
										src={"/images/product_images/boy-iso-premium.png"}
										width={0}
										alt=''
										height={0}
										sizes='100vw'
										className='w-[80%] mx-auto h-auto'
									/>
									<h1 className='text-3xl text-center font-[600] p-4 leading-[18px]'>
										Vào trang admin
									</h1>
								</div>
							)}
						</div>
					</div>
				</div>
				<div className='text-center mt-16'>
					<div className='text-3xl'>
						Bạn chưa tìm được sản phẩm ưng ý?
					</div>
					<div className='flex gap-2 items-center justify-center text-2xl'>
						<CiStar size={30} /> Xem toàn bộ sản phẩm{" "}
						<span
							onClick={() => {
								router.push("/products")
							}}
							className='text-blue-500 cursor-pointer underline'
						>
							tại đây
						</span>
					</div>
				</div>
				<AdvertisementShipping />\
				<Advertisement />
				<ProductListAbs />
			</div>
		</div>
	)
}

export default MainContent
