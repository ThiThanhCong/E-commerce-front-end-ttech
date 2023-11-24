import { handleAdmin } from "@/app/api/handleAdmin"
import useDebounce from "@/customHook/useDeboune"
import { useEffect, useState } from "react"
import { CiShoppingBasket } from "react-icons/ci"

const BestSellProduct = () => {
	const [top, setTop] = useState(1)
	const [list, setList] = useState([
		{
			productId: "609bbadf-409f-48e0-9fff-4e2bea4b13f0",
			totalQuantitySold: 5,
			productName: "Cục Gạch XX",
			image: {
				image_id: "3e26b1a9-f1b0-41a0-a052-1a4478a42271",
				product_id: "609bbadf-409f-48e0-9fff-4e2bea4b13f0",
				image_href:
					"https://localhost:7067/Upload/product/609bbadf-409f-48e0-9fff-4e2bea4b13f0/609bbadf-409f-48e0-9fff-4e2bea4b13f0202311101917278570.jpg",
			},
		},
	])

	const getProductTop = async () => {
		const result = await handleAdmin.GetTopSellerProduct(
			debounce
		)
		console.log("GetTopSellerProduct ", result)
		setList(result)
	}

	const debounce = useDebounce(top, 500)

	useEffect(() => {
		getProductTop()
	}, [debounce])
	return (
		<div className='p-4 mt-4 ml-4 grow bg-white border border-black/20 rounded-2xl'>
			<h1 className='text-2xl flex items-center gap-2 font-[700] p-4'>
				<CiShoppingBasket size={22} /> Sản phẩm bán chạy
			</h1>
			<form onSubmit={(e) => e.preventDefault()}>
				<input
					onChange={(e) => setTop(e.target.value)}
					placeholder='Nhập vào `top` sản phẩm'
					value={top}
					className='w-full py-2 px-4 text-2xl border border-blue-500/50 rounded-3xl '
				/>
			</form>

			<div className='h-[500px] overflow-y-scroll'>
				<div className='flex mt-4 gap-4'>
					<div className='flex-1 bg-sky-600/10  rounded-full p-2 flex items-center justify-center'></div>
					<div className='flex-1 bg-sky-600/10  rounded-full p-2 flex text-xl items-center justify-center'>
						Tên sản phẩm
					</div>
					<div className='flex-1 bg-sky-600/10  rounded-full p-2 flex text-xl items-center justify-center'>
						Số lượng bán được
					</div>
				</div>

				{list?.map((x, i) => {
					return (
						<div key={i} className='flex gap-4 '>
							<div className='flex-1 p-2 flex items-center justify-center'>
								<img
									src={x.image.image_href}
									alt=''
									width={70}
									height={70}
								/>
							</div>
							<div className='flex-1 p-2 flex text-xl items-center justify-center text-center'>
								{x.productName}
							</div>
							<div className='flex-1 p-2 flex text-xl items-center justify-center'>
								{x.totalQuantitySold}
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default BestSellProduct
