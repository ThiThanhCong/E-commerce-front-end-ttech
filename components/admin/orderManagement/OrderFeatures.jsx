"use client"

import { BASE_URL } from "@/constants/constant"
import https from "https"
import { saveAs } from 'file-saver';
const { default: axios } = require("axios")

const agent = new https.Agent({
	rejectUnauthorized: false,
})
export const axs = axios.create({
	baseURL: BASE_URL,
	httpsAgent: agent,
})

const OrderFeatures = () => {
	const handleDownloadExcelFile = async () => {
		try {
			const result = await axs.get("/getExcel/GetExcel", {
				responseType: "arraybuffer",
			})
			console.log(result)
			const blob = new Blob([result.data], {
				type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
			});
			saveAs(blob, 'example.xlsx');
		} catch (error) {
			console.error("Error downloading file", error)
		}
	}

	return (
		<div className='flex mb-2 text-xl text-white font-[600] gap-5'>
			<button
				onClick={handleDownloadExcelFile}
				className='bg-blue-500 px-4 py-2 rounded-lg'
			>
				Xuất Exel
			</button>
		</div>
	)
}

export default OrderFeatures
