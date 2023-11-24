import { axiosClient } from "./axiosClient"

export const handleProduct = {
	getProduct: async (filter) =>
		await axiosClient.post("/product/getProduct", filter),

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

	updateProduct: async (data, token) =>
		await axiosClient.put("/update/" + data.product_id, data,
			{
				headers:
					{ Authorization: `Bearer ${token}` },
			}
		),

	deleteImageOfProduct: async (id, image_path) =>
		await axiosClient.post("/deleteImage/" + id, image_path,
			{
				headers:
					{ Authorization: `Bearer ${token}` },
			}),
}
