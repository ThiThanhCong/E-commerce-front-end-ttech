import { axiosClient } from "./axiosClient"

export const handleSupplier = {
	getAllSupplier: async (token) => await axiosClient.get("/supplier/", { headers: { Authorization: `Bearer ${token}` } })

}
