import { axiosClient } from "./axiosClient"

export const handleProductCategory = {
	addNewProductCategory: async (data) =>
		await axiosClient.post(
			"/ProductCategory/AddNewProductCategory",
			data
		),
	updateProductCategory: async (data) =>
		await axiosClient.put(
			"/ProductCategory/UpdateProductCategory",
			data
		),
}
