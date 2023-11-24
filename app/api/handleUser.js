import { axiosClient } from "./axiosClient"

export const handleUser = {
    getAllUser: async () =>
        await axiosClient.get("/User/GetAllUser"),
    forgetPassword: async (email) =>
        await axiosClient.post("/User/ForgetPassword", email, {
            headers: { "Content-Type": "application/json" },
        }),
    updateUser: async (updatedUser) =>
        await axiosClient.put(
            "/User/UpdateUserInfor",
            updatedUser,
            {
                headers: { "Content-Type": "application/json" },
            }
        ),
    getUserById: async (user_id) =>
        await axiosClient.get(
            "/User/GetUserById?userId=" + user_id
        ),
}