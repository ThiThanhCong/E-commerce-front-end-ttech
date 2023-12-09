import { axiosClient } from "./axiosClient"

export const handleSupplier = {
	getAllSupplier: async (token) => await axiosClient.get("/supplier/", { headers: { Authorization: `Bearer ${token}` } }),

	addSupplier: async (data, token) =>
		axiosClient.post("/supplier/create", data, {
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json"
			},
		}),
	updateSupplier: async (data, token) =>
		await axiosClient.put("/supplier/update/" + data.supplier_id, data, {
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json"
			},
		}),
	deleteSupplier: async (id, token) =>
		await axiosClient.delete(
			"/supplier/delete/" + id, {
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json"
			},
		}
		),

}
