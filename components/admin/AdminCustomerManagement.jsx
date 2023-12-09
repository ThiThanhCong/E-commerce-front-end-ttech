"use client"

import { useEffect, useState } from "react"
import UserRenderList from "./customerManagement/UserRenderList"
import { handleUser } from "@/app/api/handleUser"
import { UserAuth } from "@/context/AuthContext"

const AdminCustomerManagement = () => {
	const { token, user } = UserAuth();
	const [userList, setUserList] = useState([
		{
			user_id: "bdf9bc14-719c-481a-8da1-5d0b8446b2e0",
			name: "Hoàng Linh",
			email: "LinhTinhTinh@gmail.com",
			phone: "0856661768",
			password:
				"$2a$11$61fk6yiLy104ppt4JjCcf.PdvBGRXpeIJFzyqyTIXeB1k5l.NrH6W",
			isAdmin: "0",
			create_at: "0001-01-01T00:00:00",
		},
	])
	const getData = async () => {
		const result = await handleUser.getAllUser(token)
		console.log(result)
		setUserList(result)
	}

	useEffect(() => {
		console.log("RUNNNNNNNNN")
		getData()
	}, [])

	return (
		<div className='container mt-10'>
			<div>
				<UserRenderList
					userList={userList}
					setUserList={setUserList}
				/>
			</div>
		</div>
	)
}

export default AdminCustomerManagement
