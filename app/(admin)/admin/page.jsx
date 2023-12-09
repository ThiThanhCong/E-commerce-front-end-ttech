"use client"


import CustomerMessage from "@/components/admin/customerManagement/CustomerMessage"
import AdminDashboard from "../../../components/admin/AdminDashboard"
import AdminNavigator from "../../../components/admin/AdminNavigator"
import AdminOrderManagement from "../../../components/admin/AdminOrderManagement"
import AdminProductManagement from "../../../components/admin/AdminProductManagement"
import { AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { UserAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import AdminDiscountManagement from "@/components/admin/AdminDiscountManagement"
import AdminSupplierManagement from "@/components/admin/AdminSupplierManagement"
import AdminCategoryManagement from "@/components/admin/AdminCategoryManagement"
import AdminCustomerManagement from "@/components/admin/AdminCustomerManagement"

const Page = () => {

	const [route, setRoute] = useState("dashboard")
	const { user, setUser } = UserAuth()
	const router = useRouter()
	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"))
		console.log("user, ", user)
		if (user?.role !== "admin" || user === null) return router.push("/upcomming/unAuthorized")
		if (user?.user_id) setUser(user)
	}, [])

	return (
		<div className='container mx-auto'>
			<AdminNavigator route={route} onRouteChange={setRoute} />

			<AnimatePresence>
				{route === "dashboard" && <AdminDashboard />}
				{route === "product" && <AdminProductManagement />}
				{route === "order" && <AdminOrderManagement />}
				{route === "customer" && <AdminCustomerManagement />}
				{route === "message" && <CustomerMessage />}
				{/* {route === "discount" && <AdminDiscountManagement />} */}
				{route === "supplier" && <AdminSupplierManagement />}
				{route === "category" && <AdminCategoryManagement />}
			</AnimatePresence>
		</div>
	)
}

export default Page