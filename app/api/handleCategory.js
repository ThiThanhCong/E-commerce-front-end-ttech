import { axiosClient } from "./axiosClient"

export const handleCategory = {
	getAllCategories: async () =>
		await axiosClient.get("/category/"),
	getCategoryById: async (id) =>
		await axiosClient.get("/category/" + id),
	updateCategory: async (id, data, token) =>
		await axiosClient.put(
			"/category/update/" + id, data, {
			headers: { Authorization: `Bearer ${token}` }
		}
		),
	addCategory: async (data, token) =>
		await axiosClient.post("/category/create", data, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`
			},
		}),
	deleteCategory: async (id, token) =>
		await axiosClient.delete(`/category/delete/${id}`, {
			headers: { Authorization: `Bearer ${token}` }
		}),
}
