import { axiosClient } from "./axiosClient"

export const handleProduct = {
	getProduct: async (filter) =>
		await axiosClient.post("/product/getProduct", filter),

	addNewProduct: async (data) =>
		await axiosClient.post("/product/createProduct", data
		),

	getProductBySearchParam: async (filter) =>
		await axiosClient.post(
			"/product/getProduct",
			filter,
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		),
	getProducctById: async (id) =>
		await axiosClient.get("/product/" + id),

	getAllImageOfProduct: async (id) =>
		await axiosClient.get(
			"/product/getImagesByProductId/" + id,
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		),

	updateProduct: async (data) =>
		await axiosClient.put("/product/update/" + data.product_id, data
		),

	deleteImageOfProduct: async (data) =>
		await axiosClient.post("/product/deleteImage", data),
	addImage: async (data) =>
		await axiosClient.post(
			"/product/addImageToProduct",
			data,
			{
				headers: {
					Accept: "application/json",
					"Accept-Language": "en-US,en;q=0.8",
					"Content-Type": `multipart/form-data; boundary=${data._boundary}`,
				},
			}
		),
	deleteProduct: async (product_id) =>
		await axiosClient.delete(
			"/product/delete/" + product_id, {
			"Content-Type": "application/json",
		}
		),
}
