import { handleDiscount } from "@/app/api/handleDiscount."
import { handleSupplier } from "@/app/api/handleSupplier"
import { motion } from "framer-motion"
import { v4 as uuidv4 } from "uuid"

const DiscountForm = ({
	currentDiscountClicked = {
		discountId: "1",
		discountCode: "SUMMER10",
		discountAmount: 10,
		discountDateFrom: "2022-06-01T07:00:00",
		discountDateTo: "2022-07-01T06:59:59",
	},
	setCurrentDiscountClicked,
	mode,
	setMode,
	triggerGetData,
	setTriggerGetData,
}) => {
	const handleSubmit = async (e) => {
		if (mode === "add") {
			const newDiscount = {
				discountId: uuidv4(),
				discountCode: currentDiscountClicked.discountCode,
				discountAmount: currentDiscountClicked.discountAmount,
				discountDateFrom:
					currentDiscountClicked.discountDateFrom,
				discountDateTo: currentDiscountClicked.discountDateTo,
			}
			const res = await handleDiscount.addDiscount(newDiscount)
			console.log(res)
		} else {
			const updatedDiscount = {
				discountId: currentDiscountClicked.discountId,
				discountCode: currentDiscountClicked.discountCode,
				discountAmount: currentDiscountClicked.discountAmount,
				discountDateFrom:
					currentDiscountClicked.discountDateFrom,
				discountDateTo: currentDiscountClicked.discountDateTo,
			}
			const res = await handleDiscount.updateDiscount(
				updatedDiscount
			)
			console.log(res)
		}
		setTriggerGetData((pre) => !pre)
	}

	const handleDelete = async (e) => {
		const isSure = prompt("Nhập vào '1' để xóa")
		if (isSure == "1") {
			await handleDiscount.deleteDiscount(
				currentDiscountClicked?.discountId
			)

			setCurrentDiscountClicked({
				discountId: "",
				discountCode: "",
				discountAmount: "",
				discountDateFrom: "",
				discountDateTo: "",
			})
			alert("deleted")
			setTriggerGetData((pre) => !pre)
		}
	}

	const handleOnChange = (e) => {
		const { value, id } = e.target
		console.log("id: ", id, " value: ", value)
		setCurrentDiscountClicked((pre) => ({
			...pre,
			[id]: value,
		}))
	}

	return (
		<div className=''>
			<div className='flex gap-2 justify-end'>
				<motion.div
					whileHover={{ scale: 1.1 }}
					onClick={() => {
						setMode("add")
						// clearinput
						setCurrentDiscountClicked({
							discountId: "",
							discountCode: "",
							discountAmount: "",
							discountDateFrom: "",
							discountDateTo: "",
						})
					}}
					className='px-4 cursor-pointer py-2 border border-b-4 rounded-md text-xl font-bold border-blue-500 border-b-blue-500 bg-white flex-1 shrink-0 text-center'
				>
					THÊM
				</motion.div>
				<motion.div
					onClick={handleDelete}
					whileHover={{ scale: 1.1 }}
					className='px-4 cursor-pointer py-2 border border-b-4 rounded-md text-xl font-bold border-red-500 border-b-red-500 bg-white flex-1 shrink-0 text-center'
				>
					XÓA
				</motion.div>
			</div>
			<div className='p-10'>
				{[
					{
						key: "discountId",
						name: "Id giảm giá",
						type: "text",
					},
					{
						key: "discountCode",
						name: "Mã giảm giá",
						type: "text",
					},
					{
						key: "discountAmount",
						name: "% giảm giá",
						type: "number",
					},
					{
						key: "discountDateFrom",
						name: "Giảm giá từ",
						type: "datetime-local",
					},
					{
						key: "discountDateTo",
						name: "Giảm giá đến",
						type: "datetime-local",
					},
				].map((x, i) => (
					<div className=' mb-3 w-full ' key={i}>
						<h2
							className={`text-xl mb-1 ${
								x.key === "discountId" && "text-black/50"
							}`}
						>
							{x.name}
						</h2>
						<input
							disabled={x.key === "discountId"}
							type={x.type}
							id={x.key}
							onChange={handleOnChange}
							value={currentDiscountClicked?.[x.key]}
							className={`outline-none w-full border border-black/50 ${
								x.key === "discountId" && "text-black/50"
							} p-4  text-2xl rounded-2xl font-[500]`}
							placeholder={x.name}
						/>
					</div>
				))}
				<button
					onClick={handleSubmit}
					className='bg-blue-500 w-full p-4 mt-4 text-2xl font-semibold text-white rounded-2xl'
				>
					{mode === "add" ? "THÊM" : "SỬA"}
				</button>
			</div>
		</div>
	)
}

export default DiscountForm

// mode = [add, edit]
