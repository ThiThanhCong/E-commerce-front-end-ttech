import { convertDate } from "@/components/UserOrder"
import { motion } from "framer-motion"

const CategoryRenderList = ({
	categoryList,
	setCategoryList,
	setCurrentCategoryClicked,
	currentCategoryClicked,
	setMode,
}) => {
	return (
		<table className='w-full border-spacing-1 border-separate table-auto text-xl bg-white relative'>
			<thead class=' text-black uppercase sticky top-2'>
				<tr>
					<th className='px-4 py-2 border border-b-4 rounded-md border-blue-500 bg-white flex-1 shrink-0 text-center'>
						Id
					</th>

					<th className='px-4 py-2 border border-b-4 rounded-md border-blue-500 bg-white flex-1 shrink-0 text-center'>
						Tên doanh mục
					</th>
				</tr>
			</thead>
			<tbody>
				{categoryList?.map((x, i) => (
					<motion.tr
						onClick={() => {
							setCurrentCategoryClicked(x)
							setMode("edit")
						}}
						variants={variant}
						initial='init'
						whileHover='hover'
						animate={
							x.category_id === currentCategoryClicked.category_id
								? "clicked"
								: "init"
						}
						transition={{ type: "spring" }}
						key={i}
						className='cursor-pointer'
					>
						<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
							{x.category_id}
						</th>
						<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
							{x.category_name}
						</th>
					</motion.tr>
				))}
			</tbody>
		</table>
	)
}

export default CategoryRenderList

const variant = {
	init: {
		backgroundColor: "#f8fafc",
		padding: 0,
	},
	hover: {
		backgroundColor: "#cbd5e1",
		padding: "10px 0px",
	},
	clicked: {
		backgroundColor: "rgb(147 197 253)",
		padding: "10px 0px",
	},
}
