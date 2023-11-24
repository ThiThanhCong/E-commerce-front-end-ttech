const { default: axios } = require("axios")
import { BASE_URL } from "@/constants/constant"
import https from "https"

const agent = new https.Agent({
	rejectUnauthorized: false,
})
export const axiosClient = axios.create({
	baseURL: BASE_URL,
	httpsAgent: agent,
})

axiosClient.interceptors.request.use(
	async (config) => {
		; (config.headers = {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Credentials": "true",
			"Access-Control-Max-Age": "1800",
			"Access-Control-Allow-Headers": "content-type",
			"Access-Control-Allow-Methods":
				"PUT, POST, GET, DELETE, PATCH, OPTIONS",
			...config.headers,
		}),

			config.data

		return config
	}
)

axiosClient.interceptors.response.use(
	(response) => {
		if (response.status === 200 && response.data) {
			return response.data
		}


		return response
	},
	(error) => {
		console.log(error.message)
	}
)
