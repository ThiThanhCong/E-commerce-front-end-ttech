import { axiosClient } from "./axiosClient"

export const handleAdmin = {
	GetRevenueByYear: async (year) =>
		await axiosClient.get(
			"/Admin/GetRevenueByYear?year=" + year
		),
	GetRevenueByWeek: async () =>
		await axiosClient.get("/Admin/GetRevenueByDay"),
	GetTopSellerProduct: async (count) =>
		await axiosClient.get(
			"/Admin/GetTopSellerProduct?count=" + count
		),
	GetTotalOrder: async () =>
		await axiosClient.get("/Admin/GetTotalOrder"),
	GetTotalCustomer: async () =>
		await axiosClient.get("/Admin/GetTotalCustomer"),
}
