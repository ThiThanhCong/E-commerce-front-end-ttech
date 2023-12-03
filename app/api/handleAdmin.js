import { axiosClient } from "./axiosClient"

export const handleAdmin = {
	GetRevenueByYear: async (year, token) =>
		await axiosClient.get(
			"/admin/GetRevenueByYear?" + year
			, {
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				}
			}),
	GetRevenueByWeek: async (token) =>
		await axiosClient.get("/admin/GetRevenueByDay", {
			headers: {
				Authorization: `Bearer ${token}`,
			}
		}),
	GetTopSellerProduct: async (count, token) =>
		await axiosClient.get(
			"/Admin/GetTopSellerProduct?count=" + count
			, {
				headers: {
					Authorization: `Bearer ${token}`,
				}
			}),
	GetTotalOrder: async (token) =>
		await axiosClient.get("/admin/GetTotalOrder", {
			headers: {
				Authorization: `Bearer ${token}`,
			}
		}),
	GetTotalCustomer: async (token) =>
		await axiosClient.get("/admin/GetTotalCustomer", {
			headers: {
				Authorization: `Bearer ${token}`,
			}
		}),
	GetRevenue: async (token) =>
		await axiosClient.get("/admin/getRevenue", {
			headers: {
				Authorization: `Bearer ${token}`,
			}
		}),
}
