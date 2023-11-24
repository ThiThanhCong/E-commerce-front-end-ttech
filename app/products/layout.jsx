import Header from "@/components/Header"
import Navigator from "@/components/Navigator"

export default function LoginLayout({
	children,
}) {
	return (
		<section>
			<div>
				<Header />
			</div>
			<div>
				<Navigator />
			</div>
			{children}
		</section>
	)
}
