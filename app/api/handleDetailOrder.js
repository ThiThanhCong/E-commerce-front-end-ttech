import { BASE_URL } from "@/constants/constant"
import { axiosClient } from "./axiosClient"

export const handleDetailOrder = {
	addNewDetailOrder: async (data, token) =>
		await axiosClient.post(
			"/detailOrder/addNewOrderDetail",
			data,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			}
		),
}
