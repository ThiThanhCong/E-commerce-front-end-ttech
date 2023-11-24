"use client"
import Image from "next/image"
import { useRouter } from "next/navigation"
const Advertisement = () => {
	const router = useRouter()
	return (
		<div className='container mx-auto'>
			<div className='grid grid-cols-1 sm:grid-cols-2 gap-10 my-10'>
				{advertisementList.map((x, i) => (
					<Image
						onClick={() => {
							router.push(x.onClickLink)
						}}
						key={i}
						src={x.imgSrc}
						alt=''
						width={0}
						height={0}
						sizes='100vw'
						style={{
							cursor: "pointer",
							width: "100%",
							height: "100%",
							objectFit: "cover",
						}}
					/>
				))}
			</div>
		</div>
	)
}

export default Advertisement

const advertisementList = [
	{
		id: 1,
		imgSrc: "/images/ads_images/ifalsexx.png",
		onClickLink: "/upcomming",
	},

	{
		id: 2,
		imgSrc: "/images/ads_images/nhieucach.png",
		onClickLink: "upcomming",
	},
]
