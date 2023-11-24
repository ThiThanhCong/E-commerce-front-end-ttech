"use client"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { CiSearch } from "react-icons/ci"
import AddProduct from "./AddProduct"
import { handleProduct } from "@/app/api/handleProduct"
import Notification from "@/components/Notification"

const ProductAction = ({
	filter,
	setFilter,
	setList,
	setTrigger,
	supplier,
	setSupplier,
	category,
	setCategory,
	currentProductChoose,
	setCurrentProductChoose,
}) => {
	const [notifications, setNotifications] = useState()
	const [showAdd, setShowAdd] = useState(false)
	const [deleteMode, setDeleteMode] = useState(false)
	const [product_id_delete, setProudct_id_delete] =
		useState("")

	const handleDeleteProduct = async () => {
		setDeleteMode((pre) => !pre)
		if (product_id_delete === "") return
		if (deleteMode) {
			const product_id = product_id_delete
			await handleProduct.deleteProduct(product_id)
			setNotifications(true)
			setProudct_id_delete("")
			setTrigger((pre) => !pre)
			setCurrentProductChoose({})
		}
	}
	return (
		<div className='flex justify-between'>
			{notifications && (
				<Notification
					notifications={notifications}
					setNotifications={setNotifications}
					notification={{
						text: "Đã xóa thành công",
						style: "success",
					}}
				/>
			)}
			<AddProduct
				show={showAdd}
				setShow={setShowAdd}
				setList={setList}
				setTrigger={setTrigger}
				category={category}
				setCategory={setCategory}
				supplier={supplier}
				setSupplier={setSupplier}
			/>
			<div className='flex gap-3 items-center'>
				<motion.form
					onSubmit={(e) => {
						e.preventDefault()
					}}
					className='flex items-center'
				>
					<CiSearch size={20} />
					<motion.input
						onChange={(e) => {
							setFilter((pre) => ({
								...pre,
								searchKey: e.target.value,
							}))
						}}
						value={filter.searchKey}
						whileFocus={{
							borderBottom: "1px solid black",
						}}
						placeholder='Search here'
						className='outline-none text-[1.3rem] border-none px-2 '
					/>
				</motion.form>
			</div>
			<div className='flex gap-2'>
				<button
					onClick={() => setShowAdd(true)}
					className='bg-gradient-to-tl font-[400] py-3 text-[1.4rem] from-blue-300 to-blue-600 text-white leading-6 px-5 rounded-xl'
				>
					Thêm
				</button>
				{deleteMode && (
					<motion.input
						required
						variants={variant}
						initial='init'
						exit='init'
						value={product_id_delete}
						onChange={(e) => setProudct_id_delete(e.target.value)}
						animate={deleteMode ? "animate" : "init"}
						placeholder='Nhập vào id để xóa'
						className='w-[200px] text-red-500 border placeholder-red-500 border-red-500 px-4 rounded-2xl outline-none text-[1.4rem]'
					/>
				)}
				<button
					onClick={handleDeleteProduct}
					className='border font-[400] py-3 text-[1.4rem] border-red-500 text-red-500 leading-6 px-5 rounded-xl'
				>
					{deleteMode ? "Xác nhận" : "Xóa"}
				</button>
			</div>
		</div>
	)
}

export default ProductAction

const variant = {
	init: { width: 0 },
	animate: { width: 200 },
}
