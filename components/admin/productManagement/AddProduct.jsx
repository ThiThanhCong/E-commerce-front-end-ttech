"use client"
import { handleProduct } from "@/app/api/handleProduct"
import { handleProductCategory } from "@/app/api/handleProductCategory"
import CircleLoader from "@/components/CircleLoader"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import {
	CiExport,
	CiImageOn,
	CiMinimize1,
} from "react-icons/ci"
import { v4 as uuidv4 } from "uuid"

const AddProduct = ({
	show,
	setShow,
	setList,
	setTrigger,
	supplier,
	setSupplier,
	category,
	setCategory,
}) => {
	const [data, setData] = useState({
		quantity_pr: "",
		name_serial: "",
		detail: "",
		name_pr: "",
		supplier_id: "",
		price: "",
		guarantee_period: "",
		category_id: "",
	})

	const [loading, setLoading] = useState(false)

	const [fileImage, setFileImage] = useState([])
	const [imageListDisplay, setImageListDisplay] = useState(
		[]
	)
	const token = JSON.parse(localStorage.getItem('token'))

	const addNewProduct = async (e) => {
		try {
			const imageList = [...fileImage]

			const productDetail = {
				name_pr: data.name_pr,
				name_serial: data.name_serial,
				detail: data.detail,
				price: Number.parseInt(data.price),
				quantity_pr: Number.parseInt(data.quantity_pr),
				guarantee_period: Number.parseInt(
					data.guarantee_period
				),
				supplier_id: data.supplier_id,
			}

			const productId = await handleProduct.addNewProduct(productDetail, token)

			const productCategory = {
				product_id: productId,
				category_id: data.category_id,
			}

			const formData = new FormData()

			for (let i = 0; i < imageList.length; i++) {
				const file = imageList[i];
				const formData = new FormData();
				formData.append('image_path', file);
				formData.append('product_id', productId);

				try {
					await handleProduct.addImage(formData);
				} catch (error) {
					console.error(error);
				}
			}
			await handleProductCategory.addNewProductCategory(
				productCategory, token
			)

			setTrigger((pre) => !pre)

			setData({
				quantity_pr: "",
				name_serial: "",
				detail: "",
				name_pr: "",
				supplier_id: "",
				price: "",
				guarantee_period: "",
			})
			setFileImage([])
			setImageListDisplay([])
			setShow(false)
		} catch (error) {
			console.log(error)
		}
	}

	const handleProductValueChange = (e) => {
		const { value, id } = e.target

		if (
			id === "name_pr" ||
			id === "price" ||
			id === "name_serial" ||
			id === "detail" ||
			id === "guarantee_period" ||
			id === "quantity_pr" ||
			id === "supplier_id" ||
			id === "category_id"
		) {
			setData((pre) => {
				const preData = { ...pre }
				preData[id] = value
				return preData
			})
		}
	}

	useEffect(() => {
		const handleKeyPress = (event) => {
			if (event.key === "Escape") {
				setShow(false)
			}
		}

		window.addEventListener("keydown", handleKeyPress)

		return () => {
			window.removeEventListener("keydown", handleKeyPress)
		}
	}, [])

	return (
		<AnimatePresence>
			{show && (
				<motion.div
					exit={{ scale: 0.2, opacity: 0 }}
					whileInView={{ scale: 1, opacity: 1 }}
					initial={{ scale: 0.2, opacity: 0 }}
					className='fixed inset-0 z-40 origin-top overflow-y-scroll bg-white'
				>
					<div className='absolute inset-x-0 flex top-0 bottom-0 z-[41]'>
						<div
							onClick={() => setShow(false)}
							className='absolute top-10 right-10 z-[42]'
						>
							<CiMinimize1
								size={25}
								className='bg-gradient-to-t from-blue-400 to-blue-700/70 text-white p-2 rounded-xl'
							/>
						</div>
						<div className='grow-[1] m-4 '>
							<h1 className='text-3xl bg-blue-500/30 rounded-2xl inline-block p-2 mb-10 font-[600]'>
								Hình ảnh sản phẩm
							</h1>

							<form className='bg-blue-500 w-1/2 mx-auto relative rounded-2xl h-[30px]'>
								<div className='absolute inset-0 z-0 flex items-center text-white justify-center gap-2'>
									<CiImageOn size={25} color='white' />{" "}
									<h1 className='text-2xl'>Thêm ảnh sản phẩm</h1>
								</div>

								<input
									onChange={async (e) => {
										setLoading(true)
										const files = e.target.files
										setFileImage(files)

										// Promisify the FileReader operation
										const readImageFile = (file) => {
											return new Promise((resolve, reject) => {
												const reader = new FileReader()

												reader.onload = () => {
													const imageUrl = reader.result
													resolve(imageUrl)
												}

												reader.onerror = reject
												reader.readAsDataURL(file)
											})
										}

										// Process each file using Promise.all
										try {
											const imageDataUrls = await Promise.all(
												Array.from(files).map((file) =>
													readImageFile(file)
												)
											)

											setImageListDisplay(imageDataUrls)
											setLoading(false)
										} catch (error) {
											console.error(error)
										}
									}}
									required
									type='file'
									multiple
									className='absolute inset-0 opacity-0 z-[1]'
								/>
							</form>

							{Array.isArray(imageListDisplay) && (
								<div className='flex flex-col items-center justify-center'>
									{imageListDisplay?.map((x, i) => (
										<div
											key={i}
											className='w-[200px] flex items-center justify-center h-[200px]'
										>
											{loading ? (
												<CircleLoader />
											) : (
												<img
													src={x}
													key={i}
													className='w-full h-full object-cover rounded-3xl'
												/>
											)}
										</div>
									))}
								</div>
							)}
						</div>
						<div className='grow-[2] shrink-0 m-4'>
							<h1 className='text-3xl font-[600] bg-blue-500/30 rounded-2xl mb-10 inline-block p-2'>
								Chi tiết sản phẩm
							</h1>

							<form
								onSubmit={(e) => e.preventDefault()}
								className='text-[2rem] flex flex-col gap-2 w-full '
							>
								{[
									{
										key: "name_pr",
										name: "Tên sản phẩm",
									},
									{
										key: "price",
										name: "Giá sản phẩm",
									},
									{
										key: "name_serial",
										name: "Seri",
									},
								].map((x, i) => (
									<motion.div key={i} className='flex gap-2 w-full'>
										<label className='min-w-[170px] text-black/50'>
											{x.name}
										</label>
										<motion.input
											placeholder={x.name}
											required
											id={x.key}
											value={data[x.key]}
											onChange={handleProductValueChange}
											className='outline-none border-b font-semibold border-black/20 w-full'
										/>
									</motion.div>
								))}
								<motion.div className='flex gap-2 w-full'>
									<label className='min-w-[170px] text-black/50'>
										Mô tả sản phẩm
									</label>
									<motion.textarea
										placeholder='Mô tả sản phẩm'
										id={"detail"}
										value={data.detail}
										onChange={handleProductValueChange}
										className='outline-none border-b font-semibold border-black/20 w-full'
									/>
								</motion.div>
								{[
									{
										key: "guarantee_period",
										name: "Bảo hành (tháng)",
									},
									{
										key: "quantity_pr",
										name: "Còn lại (sản phẩm)",
									},
								].map((x, i) => (
									<motion.div key={i} className='flex gap-2 w-full'>
										<label className='min-w-[170px] text-black/50'>
											{x.name}
										</label>
										<motion.input
											placeholder={x.name}
											required
											id={x.key}
											value={data[x.key]}
											onChange={handleProductValueChange}
											className='outline-none border-b border-black/20 font-semibold w-full'
										/>
									</motion.div>
								))}

								<motion.div className='flex gap-2 w-full'>
									<label className='min-w-[170px] text-black/50'>
										Doanh mục
									</label>
									<select
										id='category_id'
										onChange={handleProductValueChange}
									>
										<option>Chọn doanh mục</option>
										{category.map((x, i) => (
											<option key={i} value={x.category_id}>
												{x.category_name}
											</option>
										))}
									</select>
								</motion.div>

								<motion.div className='flex gap-2 w-full'>
									<label className='min-w-[170px] text-black/50'>
										Nhà cung cấp
									</label>
									<select
										id='supplier_id'
										onChange={handleProductValueChange}
									>
										<option>Chọn nhà cung cấp</option>
										{supplier.map((x, i) => (
											<option key={i} value={x.supplier_id}>
												{x.supplier_name}
											</option>
										))}
									</select>
								</motion.div>

								<button
									onClick={addNewProduct}
									className='bg-blue-600/80 w-1/4 mt-10 text-white font-bold text-3xl rounded-3xl py-3'
								>
									Hoàn tất
								</button>
							</form>
						</div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}

export default AddProduct
