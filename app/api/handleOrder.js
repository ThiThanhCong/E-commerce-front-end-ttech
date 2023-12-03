import { BASE_URL } from "@/constants/constant"
import { axiosClient } from "./axiosClient"

export const handleOrder = {
	getOrderByUserId: async (user, token) =>
		await axiosClient.post("/order/GetOrderById", user, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		}),

	addNewOrder: async (data, token) =>
		await axiosClient.post("/order/AddNewOrder", data, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		}),

	getAllOrder: async (token) =>
		await axiosClient.get("/order/GetAllOrder",
			{
				headers: { Authorization: `Bearer ${token}` }
			}
		),
	updateStateOrder: async (order_id, state, token) =>
		await axiosClient.put(
			"/order/UpdateStateOrder?orderId=" +
			order_id +
			"&state=" +
			state
			, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			}),
	getExcelFile: async () =>
		await axiosClient.get("/order/GetExcelFileData"),
}
