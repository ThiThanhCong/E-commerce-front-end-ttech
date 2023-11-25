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
}
