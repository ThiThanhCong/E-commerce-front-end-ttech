import { axiosClient } from "./axiosClient"

export const handleAuth = {
	register: async (formData) =>
		await axiosClient.post(
			"/auth/register",
			formData
		),
	login: async (formData) =>
		await axiosClient.post("/auth/login", formData),

}