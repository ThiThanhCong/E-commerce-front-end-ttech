import { convertDate } from "@/components/UserOrder"
import { motion } from "framer-motion"

const DiscountRenderList = ({
	discountList = [
		{
			discountId: "1",
			discountCode: "SUMMER10",
			discountAmount: 10,
			discountDateFrom: "2022-06-01T07:00:00",
			discountDateTo: "2022-07-01T06:59:59",
		},
	],
	setDiscountList,
	setCurrentDiscountClicked,
	currentDiscountClicked,
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
						discount code
					</th>

					<th className='px-4 py-2 border border-b-4 rounded-md border-blue-500 bg-white flex-1 shrink-0 text-center'>
						% giảm giá
					</th>

					<th className='px-4 py-2 border border-b-4 rounded-md border-blue-500 bg-white flex-1 shrink-0 text-center'>
						Từ ngày
					</th>

					<th className='px-4 py-2 border border-b-4 rounded-md border-blue-500 bg-white flex-1 shrink-0 text-center'>
						Đến ngày
					</th>
				</tr>
			</thead>
			<tbody>
				{discountList?.map((x, i) => (
					<motion.tr
						onClick={() => {
							setCurrentDiscountClicked(x)
							setMode("edit")
						}}
						variants={variant}
						initial='init'
						whileHover='hover'
						animate={
							x.discountId === currentDiscountClicked.discountId
								? "clicked"
								: "init"
						}
						transition={{ type: "spring" }}
						key={i}
						className='cursor-pointer'
					>
						<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
							{x.discountId}
						</th>
						<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
							{x.discountCode}
						</th>

						<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
							{x.discountAmount}
						</th>

						<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
							{x.discountDateFrom}
						</th>
						<th className='px-4 py-2 flex-1 font-[400] shrink-0 text-center'>
							{x.discountDateTo}
						</th>
					</motion.tr>
				))}
			</tbody>
		</table>
	)
}

export default DiscountRenderList

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
