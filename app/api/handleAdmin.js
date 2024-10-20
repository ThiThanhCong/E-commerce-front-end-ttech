import { axiosClient } from "./axiosClient"

export const handleAdmin = {
	GetRevenueByYear: async (year) =>
		await axiosClient.get(
			"/admin/getRevenueByYear/" + year),
	GetRevenueByWeek: async () =>
		await axiosClient.get("/admin/GetRevenueByDay"),
	GetTopSellerProduct: async (count) =>
		await axiosClient.get(
			"/admin/GetTopSellerProduct/" + count
		),
	GetTotalOrder: async () =>
		await axiosClient.get("/admin/GetTotalOrder"),
	GetTotalCustomer: async () =>
		await axiosClient.get("/admin/GetTotalCustomer"),
	GetRevenue: async () =>
		await axiosClient.get("/admin/getRevenue"),
}
