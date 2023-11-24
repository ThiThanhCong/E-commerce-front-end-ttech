"use client"

import { handleAuth } from "@/app/api/handleAuth"
import { motion } from "framer-motion"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FcGoogle } from "react-icons/fc"
import { UserAuth } from "../context/AuthContext"
import CircleLoader from "./CircleLoader"
import PopupRegister from "./PopupRegister"
import { UserCart } from "@/context/CartContex"
import { axiosClient } from "@/app/api/axiosClient"

const LoginForm = () => {
	const router = useRouter()
	const [loading, setLoading] = useState(false)

	const [data, setData] = useState({
		phone: "",
		password: "",
	})

	const {
		googleSignIn,
		signOut,
		user,
		setUser,
		setToken,
		token,
	} = UserAuth()

	const { setTriggerRerender } = UserCart()

	const handleLogin = async () => {
		try {
			setLoading(true)
			const res = await handleAuth.login(data)
			const { user, token } = res
			console.log(user);
			setUser(user)
			setToken(token)
			setTriggerRerender(1)
			router.push("/")
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className='p-[30px] w-[500px] mx-auto'>
			<div className='flex gap-4 justify-center'>
				<h1 className='text-[3rem] pt-[10px] font-[700] capitalize tracking-wide'>
					Đăng nhập tài khoản{" "}
				</h1>
				<div className='relative w-[120px]'>
					<Image
						src={"/images/1x/Asset1.png"}
						fill
						alt='logo'
						style={{ objectFit: "contain" }}
					/>
				</div>
			</div>

			<form
				onSubmit={(e) => e.preventDefault()}
				className='flex flex-col mt-2 gap-2'
			>
				{["phone", "password"].map((x, i) => (
					<motion.input
						required
						type={x}
						key={i}
						whileFocus={{
							scale: 1.05,
							borderColor: "#3b82f6",
						}}
						value={data[x]}
						onChange={(e) => {
							setData((pre) => ({
								...pre,
								[x]: e.target.value,
							}))
						}}
						placeholder={x}
						className='w-full border-b-2  outline-none text-[2.5rem] font-[600] px-2'
					/>
				))}

				<h1 className='text-blue-400 text-right font-[500] text-xl'>
					Quên mật khẩu
				</h1>

				<motion.button
					onClick={handleLogin}
					initial={{
						backgroundColor: "#60a5fa",
						color: "white",
					}}
					whileHover={{ backgroundColor: "#2563eb" }}
					transition={{ type: "spring" }}
					className='w-full flex items-center justify-center uppercase font-[600] mt-2  p-3 rounded-3xl text-[1.8rem]'
				>
					{loading ? <CircleLoader /> : "Đăng nhập"}
				</motion.button>
			</form>
			<PopupRegister />
			<div className='uppercase text-center text-[1.4em] font-[700] my-6'>
				hoặc
			</div>

			<button
				className='w-full bg-slate-400 text-[1.8rem] relative p-2 rounded-3xl flex  justify-center items-center text-white'
				onClick={() => {
					googleSignIn()
				}}
			>
				<div className='bg-white rounded-[16px] p-2 w-[28px] h-[28px]  flex items-center justify-center absolute left-2 '>
					<FcGoogle size={22} />
				</div>
				<h1>Đăng nhập bằng Google</h1>
			</button>
		</div>
	)
}

export default LoginForm
