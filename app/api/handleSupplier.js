import { axiosClient } from "./axiosClient"

export const handleSupplier = {
	getAllSupplier: async () => await axiosClient.get("/supplier/"),

	addSupplier: async (data) =>
		axiosClient.post("/supplier/create", data),
	updateSupplier: async (data) =>
		await axiosClient.put("/supplier/update/" + data.supplier_id, data),
	deleteSupplier: async (id) =>
		await axiosClient.delete(
			"/supplier/delete/" + id
		),

}
