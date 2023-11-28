import { axiosClient } from "./axiosClient"

export const handleProductCategory = {
	addNewProductCategory: async (data, token) =>
		await axiosClient.post(
			"/prodcate/AddNewProductCategory",
			data,
			{ headers: { Authorization: `Bearer ${token}` } }
		),
	updateProductCategory: async (
		data,
		token
	) => {
		console.log(token)
		await axiosClient.put(
			"/prodcate/UpdateProductCategory", data, {
			headers: { Authorization: `Bearer ${token}` }
		}
		)
	},
}
