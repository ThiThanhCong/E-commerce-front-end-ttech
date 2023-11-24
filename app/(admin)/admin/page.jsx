"use client"

import CustomerMessage from "@/components/admin/customerManagement/CustomerMessage"
import AdminDashboard from "../../../components/admin/AdminDashboard"
import AdminNavigator from "../../../components/admin/AdminNavigator"
import AdminOrderManagement from "../../../components/admin/AdminOrderManagement"
import AdminProductManagement from "../../../components/admin/AdminProductManagement"
import { AnimatePresence } from "framer-motion"
import { useState } from "react"

const Page = () => {
	const [route, setRoute] = useState("dashboard")

	return (
		<div className='container mx-auto'>
			<AdminNavigator
				route={route}
				onRouteChange={setRoute}
			/>

			<AnimatePresence>
				{route === "dashboard" && <AdminDashboard />}
				{route === "product" && (
					<AdminProductManagement />
				)}
				{route === "order" && (
					<AdminOrderManagement />
				)}
				{route === "message" && <CustomerMessage />}
			</AnimatePresence>
			{/* routeNavigator[i] = ["dashboard", "product", "order"] */}
			{/* <RealTimeMessageAdmin /> */}
		</div>
	)
}

export default Page