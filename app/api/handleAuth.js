import { axiosClient } from "./axiosClient"

export const handleAuth = {
	register: async (formData) =>
		await axiosClient.post(
			"/auth/register",
			formData
		),
	login: async (formData) =>
		await axiosClient.post("/auth/login", formData),

	checkAdminUser: async (token) =>
		await axiosClient.get(
			"/auth/userAdmin", {
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			}
		}
		),
}