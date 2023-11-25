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
import ForgetPassword from "./ForgetPassword"
import { isValidPhoneNumber } from "@/utils/until"

const LoginForm = () => {
	const router = useRouter()
	const [loading, setLoading] = useState(false)
	const [verifyInput, setVerifyInput] = useState({
		phone: "",
		password: "",
	})

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

	const verify = (id, value) => {
		let errorMessage = ""
		if (!value.trim()) {
			errorMessage = `Vui lòng nhập ${id == "phone" ? "số điện thoại" : "mật khẩu"
				}`
		} else if (id === "phone" && !isValidPhoneNumber(value))
			errorMessage = "Sai định dạng số điện thoại"

		setVerifyInput((pre) => ({
			...pre,
			[id]: errorMessage,
		}))

		return errorMessage === ""
	}

	const handleInputChange = (e) => {
		const { value, id } = e.target
		verify(id, value)
		setData((pre) => ({ ...pre, [id]: value }))
	}

	const handleLogin = async () => {
		try {
			const isOke =
				verify("phone", data.phone) &&
				verify("password", data.password)

			console.log("isOke ", isOke)

			if (!isOke) return

			setLoading(true)
			const res = await handleAuth.login(data)

			if (res?.token) {
				const { user, token } = res
				setUser(user)
				setToken(token)
				router.push("/")
			} else {
				setVerifyInput((pre) => ({
					...pre,
					password: "Sai thông tin đăng nhập",
				}))
			}

			setLoading(false)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className='p-[30px] md:w-[500px] mx-auto'>
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

			<div className='flex flex-col mt-2 gap-2'>
				{["phone", "password"].map((x, i) => (
					<div key={i}>
						<motion.input
							required
							type={x}
							id={x}
							whileFocus={{
								scale: 1.05,
								borderColor: "#3b82f6",
							}}
							value={data[x]}
							onChange={handleInputChange}
							placeholder={x}
							className='w-full border-b-2  outline-none text-[2.5rem] font-[600] px-2'
						/>
						<h3 className='text-red-500 text-xl mt-2'>
							{verifyInput[x]}
						</h3>
					</div>
				))}

				<ForgetPassword />

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
			</div>
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