import { convertDate } from "@/components/UserOrder"
import { motion } from "framer-motion"

const SupplierRenderList = ({
	supplierList,
	setSupplierList,
	setCurrentSupplierClicked,
	currentSupplierClicked,
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
						Tên nhà cung cấp
					</th>
				</tr>
			</thead>
			<tbody>
				{supplierList?.map((x, i) => (
					<motion.tr
						onClick={() => {
							setCurrentSupplierClicked(x)
							setMode("edit")
						}}
						variants={variant}
						initial='init'
						whileHover='hover'
						animate={
							x.supplier_id === currentSupplierClicked.supplier_id
								? "clicked"
								: "init"
						}
						transition={{ type: "spring" }}
						key={i}
						className='cursor-pointer'
					>
						<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
							{x.supplier_id}
						</th>
						<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
							{x.supplier_name}
						</th>
					</motion.tr>
				))}
			</tbody>
		</table>
	)
}

export default SupplierRenderList

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
