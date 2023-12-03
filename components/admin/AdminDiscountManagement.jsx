"use client"
import { useEffect, useState } from "react"
import SupplierRenderList from "./supplierManagement/SupplierRenderList"
import { handleSupplier } from "@/app/api/handleSupplier"
import SupplierForm from "./supplierManagement/SupplierForm"
import { handleDiscount } from "@/app/api/handleDiscount."
import DiscountRenderList from "./discountManagement/DiscountRenderList"
import DiscountForm from "./discountManagement/DiscountForm"

const AdminSupplierManagement = () => {
	const [discountList, setDiscountList] = useState([])
	const [mode, setMode] = useState("add")
	const [triggerGetData, setTriggerGetData] = useState(false)

	const [currentDiscountClicked, setCurrentDiscountClicked] =
		useState({})

	const getData = async () => {
		const response = await handleDiscount.getAllDiscount()
		if (Array.isArray(response)) setDiscountList(response)
	}

	useEffect(() => {
		getData()
	}, [triggerGetData])

	return (
		<div className='container mx-auto flex mt-10 gap-5'>
			<div className='flex-1'>
				<DiscountRenderList
					discountList={discountList}
					setDiscountList={setDiscountList}
					currentDiscountClicked={currentDiscountClicked}
					setCurrentDiscountClicked={setCurrentDiscountClicked}
					setMode={setMode}
				/>
			</div>
			<div className='flex-1 bg-white'>
				<DiscountForm
					currentDiscountClicked={currentDiscountClicked}
					setCurrentDiscountClicked={setCurrentDiscountClicked}
					mode={mode}
					setMode={setMode}
					triggerGetData={triggerGetData}
					setTriggerGetData={setTriggerGetData}
				/>
			</div>
		</div>
	)
}

export default AdminSupplierManagement
