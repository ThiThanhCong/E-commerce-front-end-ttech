import { axiosClient } from "./axiosClient"

export const handleUser = {
    getAllUser: async () =>
        await axiosClient.get("/auth/index"),
    forgetPassword: async (email) =>
        await axiosClient.post("/sendmail/ForgetPassword/" + email, {
            headers: { "Content-Type": "application/json" },
        }),
    updateUser: async (updatedUser) =>
        await axiosClient.put(
            "/auth/update/" + updatedUser.user_id,
            updatedUser,
            {
                headers: { "Content-Type": "application/json" },
            }
        ),
    getUserById: async (user_id) =>
        await axiosClient.get(
            "/auth/getById/" + user_id
        ),
}