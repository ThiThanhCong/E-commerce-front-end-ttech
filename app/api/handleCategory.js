import { axiosClient } from "./axiosClient"

export const handleCategory = {
	getAllCategories: async () =>
		await axiosClient.get("/category/"),
	getCategoryById: async (id) =>
		await axiosClient.get("/category/" + id),
	updateCategory: async (id, data) =>
		await axiosClient.put(
			"/category/update/" + id, data
		),
	addCategory: async (data) =>
		await axiosClient.post("/category/create", data),
	deleteCategory: async (id) =>
		await axiosClient.delete(`/category/delete/${id}`),
}
