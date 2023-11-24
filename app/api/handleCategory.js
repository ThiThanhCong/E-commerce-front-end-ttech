import { axiosClient } from "./axiosClient"

export const handleCategory = {
	getAllCategories: async () =>
		await axiosClient.get("/category/"),
	getCategoryById: async (id) =>
		await axiosClient.get("/category/" + id),
}
