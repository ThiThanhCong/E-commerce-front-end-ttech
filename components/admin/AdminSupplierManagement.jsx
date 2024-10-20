"use client"
import { useEffect, useState } from "react"
import SupplierRenderList from "./supplierManagement/SupplierRenderList"
import { handleSupplier } from "@/app/api/handleSupplier"
import SupplierForm from "./supplierManagement/SupplierForm"

const AdminSupplierManagement = () => {
	const [supplierList, setSupplierList] = useState([])
	const [mode, setMode] = useState("add")
	const [triggerGetData, setTriggerGetData] = useState(false)

	const [currentSupplierClicked, setCurrentSupplierClicked] =
		useState({})

	const getData = async () => {
		const response = await handleSupplier.getAllSupplier()
		if (Array.isArray(response)) setSupplierList(response)
	}

	useEffect(() => {
		getData()
	}, [triggerGetData])

	return (
		<div className='container mx-auto flex mt-10 gap-5'>
			<div className='flex-1'>
				<SupplierRenderList
					supplierList={supplierList}
					setSupplierList={setSupplierList}
					currentSupplierClicked={currentSupplierClicked}
					setCurrentSupplierClicked={setCurrentSupplierClicked}
					setMode={setMode}
				/>
			</div>
			<div className='flex-1 bg-white'>
				<SupplierForm
					currentSupplierClicked={currentSupplierClicked}
					setCurrentSupplierClicked={setCurrentSupplierClicked}
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
