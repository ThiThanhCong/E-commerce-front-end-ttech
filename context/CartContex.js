"use client"

import { handleCart } from "@/app/api/handleCart"
import { UserAuth } from "@/context/AuthContext"

const {
	createContext,
	useContext,
	useState,
	useEffect,
} = require("react")

const CartContext = createContext()

export const CartContextProdiver = ({ children }) => {
	const [totalProduct, setTotalProduct] = useState(0)

	const [cart, setCart] = useState([1, 1, 1, 1, 1])
	const [cartLoading, setCartLoading] = useState(true)

	const [triggerRerender, setTriggerRerender] = useState(0)

	// const { token, user } = UserAuth();

	const [totalPrice, setTotalPrice] = useState(() => {
		let total = 0
		cart
			.map((x) => x?.quantity * x?.product?.price || 0)
			.forEach((x) => {
				total += x
			})
		console.log("this is the cart: ", cart)
		return total
	})

	useEffect(() => {
		let total = 0
		cart
			?.map((x) => x?.quantity * x?.product?.price || 0)
			.forEach((x) => {
				total += x
			})
		setTotalPrice(total)
	}, [cart])

	const getCurrentProductInCart = async (id, token) => {
		const result = await handleCart.GetCartProduct(id, token)
		console.log("getCurrentProductInCart:", result)
		setCart(result)
		setCartLoading(false)
	}

	useEffect(() => {
		try {
			const user = JSON.parse(localStorage.getItem("user"))
			const token = JSON.parse(localStorage.getItem("token"))
			console.log("reget product")
			if (user?.user_id) {
				getCurrentProductInCart(user, token)
			}
		} catch (error) {
			console.log(error)
		}
	}, [totalProduct, triggerRerender])

	const getUserTotalProduct = async (userId, token) => {
		try {
			const result = await handleCart.getCountProductOnCart(
				userId,
				token
			)

			setTotalProduct(Array.isArray(result) ? result : [])
		} catch (e) {
			console.log(e)
		}
	}

	useEffect(() => {
		try {
			const user = JSON.parse(localStorage.getItem("user"))

			const token = JSON.parse(localStorage.getItem("token"))
			console.log("this is token: ", token)
			console.log("this is user: ", user)
			if (user?.user_id) {
				getUserTotalProduct(user, token)
			} else {
				console.log("error with user id in cart Context")
			}
		} catch (error) {
			console.log(error)
		}
	}, [triggerRerender])

	return (
		<CartContext.Provider
			value={{
				totalProduct,
				setTotalProduct,
				cart,
				setCart,
				cartLoading,
				setCartLoading,
				setTriggerRerender,
				triggerRerender,
				totalPrice,
				setTotalPrice,
			}}
		>
			{children}
		</CartContext.Provider>
	)
}

export const UserCart = () => useContext(CartContext)
