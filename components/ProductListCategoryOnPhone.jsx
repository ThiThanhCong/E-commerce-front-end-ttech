import { handleCategory } from "@/app/api/handleCategory"
import caterogyDataExample from "../data"
import { useEffect, useState } from "react"

const ProductListCategoryOnPhone = () => {
	const [categoryList, setCategoryList] = useState(
		caterogyDataExample
	)

	const getAllCategories = async () => {
		const result =
			await handleCategory.getAllCategories()

		setCategoryList(result || caterogyDataExample)
	}

	useEffect(() => {
		getAllCategories()
	}, [])

	return (
		<div className='flex flex-col ml-3 gap-3 text-[1.8rem] w-full'>
			{categoryList.map((x, i) => (
				<div
					key={i}
					className='text-[2.5rem] font-[600] tracking-[0.007em]	capitalize'
				>
					{x.category_name}
				</div>
			))}
		</div>
	)
}

export default ProductListCategoryOnPhone
