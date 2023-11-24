import Footer from "@/components/Footer"
import Header from "@/components/Header"
import Navigator from "@/components/Navigator"

export default function DashboardLayout({
	children,
}) {
	return (
		<section className=''>
			<div>
				<Header />
			</div>
			<div>
				<Navigator />
			</div>

			{children}

			<Footer />
		</section>
	)
}
