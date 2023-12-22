import Image from "next/image"
import AdminInformation from "./AdminInformation"

export const adminRouteNavigator = [
	"dashboard",
	"product",
	"order",
	"customer",
	"message",
	"supplier",
	"category",
]

const AdminNavigator = ({ route, onRouteChange }) => {
	return (
		<div className='mx-4 mt-4'>
			<div className='flex justify-between items-center'>
				<div className='flex items-center gap-2'>
					<Image
						src={"/images/0.5x/Asset_9@0.5x.png"}
						width={30}
						alt=''
						height={30}
						style={{ objectFit: "contain" }}
					/>
					<h1 className='text-[1.7rem] font-[800]'>T-TECH</h1>
				</div>
				<ul className=' flex capitalize text-[1.4rem] gap-5 items-center'>
					{adminRouteNavigator.map((x, i) => (
						<li
							key={i}
							style={{
								color: route === x ? "#db2777" : "black",
							}}
							onClick={() => {
								onRouteChange(x)
							}}
							className='cursor-pointer'
						>
							{x}
						</li>
					))}
				</ul>
				<div>
					<AdminInformation />
				</div>
			</div>
		</div>
	)
}

export default AdminNavigator
