import Header from "../components/Header"
import Navigator from "../components/Navigator"
import MainContent from "../components/MainContent"
import Footer from "@/components/Footer"

export default function Home() {
	return (
		<>
			<div className='h-[70px]'></div>

			<div>
				<Header />
			</div>
			<div>
				<Navigator />
			</div>

			<MainContent />

			<div>
				<Footer />
			</div>
		</>
	)
}
