"use client"

import { imageSlideList } from "../data"
import Image from "next/image"
import { useEffect, useState } from "react"
const ImageSlide = () => {
	const [current, setCurrent] = useState(0)

	const length = imageSlideList.length
	const array_list_number = []
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrent((prevCurrent) =>
				prevCurrent === length - 1 ? 0 : prevCurrent + 1
			)
		}, 5000)

		return () => {
			clearInterval(interval)
		}
	}, [length])
	for (
		let index = 0;
		index < imageSlideList.length;
		index++
	) {
		array_list_number.push(index + 1)
	}

	if (!Array.isArray(imageSlideList) || length <= 0) {
		return null
	}

	return (
		<div className='flex items-center relative md:px-10 md:pt-10 image-slide'>
			<div className='flex-grow overflow-hidden'>
				<div
					className='flex transition-transform duration-500 ease-in-out'
					style={{
						transform: `translateX(-${current * 100}%)`,
					}}
				>
					{imageSlideList?.map((image, index) => (
						<div key={index} className='flex-none w-full'>
							<Image
								src={"/images/image_slide/" + image}
								width={0}
								alt=''
								height={0}
								sizes='100vw'
								style={{
									width: "100%",
									height: "auto",
									borderRadius: "20px",
									objectFit: "contain",
								}} // optional
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default ImageSlide
