"use client"
import { handleCategory } from "@/app/api/handleCategory"
import { useEffect, useState } from "react"
import CategoryRenderList from "./categoryManagement/CategoryRenderList"
import CategoryForm from "./categoryManagement/CategoryForm"

const AdminCategoryManagement = () => {
	const [categoryList, setCategoryList] = useState([])
	const [mode, setMode] = useState("add")
	const [triggerGetData, setTriggerGetData] = useState(false)

	const [currentCategoryClicked, setCurrentCategoryClicked] =
		useState({})

	const getData = async () => {
		const response = await handleCategory.getAllCategories()
		console.log(response)
		if (Array.isArray(response)) setCategoryList(response)
	}

	useEffect(() => {
		getData()
	}, [triggerGetData])

	return (
		<div className='container mx-auto flex mt-10 gap-5'>
			<div className='flex-1'>
				<CategoryRenderList
					categoryList={categoryList}
					setCategoryList={setCategoryList}
					currentCategoryClicked={currentCategoryClicked}
					setCurrentCategoryClicked={setCurrentCategoryClicked}
					setMode={setMode}
				/>
			</div>
			<div className='flex-1 bg-white'>
				<CategoryForm
					currentCategoryClicked={currentCategoryClicked}
					setCurrentCategoryClicked={setCurrentCategoryClicked}
					mode={mode}
					setMode={setMode}
					triggerGetData={triggerGetData}
					setTriggerGetData={setTriggerGetData}
				/>
			</div>
		</div>
	)
}

export default AdminCategoryManagement
