import { Inter } from "next/font/google"
import { AuthContextProvider } from "../context/AuthContext"
import "./globals.css"
import https from "https"
import { CartContextProdiver } from "@/context/CartContex"

https.globalAgent.options.rejectUnauthorized = false

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
	title: "Tech Products",
	description: "E-comerce",
	icons: {
		url: "/icon.png",
	},
}

export default function RootLayout({ children }) {
	return (
		<html lang='en' suppressHydrationWarning={true}>
			<CartContextProdiver>
				<AuthContextProvider>
					<body className={inter.className}>
						{children}
					</body>
				</AuthContextProvider>
			</CartContextProdiver>
		</html>
	)
}
