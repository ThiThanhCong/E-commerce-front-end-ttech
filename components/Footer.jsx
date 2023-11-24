"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import DropDown from "./DropDown"
const style = {
	footer_links: "flex flex-col cursor-pointer",
	footer_links_header:
		"font-[600] text-[1.7rem] text-black/90 cursor-pointer",
	footer_links_item:
		"text-[1.5rem] text-black/90 font-[300] cursor-pointer",
}

const Footer = () => {
	return (
		<div className='mt-5'>
			<div className='w-full px-5'>
				{/* see on Tablet + PC mode */}
				<div className='hidden md:flex justify-between gap-5  divide-black/30'>
					{footerData.map((footer, i) => (
						<div key={i} className={style.footer_links}>
							<h4 className={style.footer_links_header}>
								{footer.header}
							</h4>
							<div>
								{footer.links.map((link, j) => (
									<motion.h1
										key={j}
										className={style.footer_links_item}
									>
										<motion.span
											whileHover={{
												borderBottom: "1px solid black",
											}}
										>
											{link.text}
										</motion.span>
									</motion.h1>
								))}
							</div>
						</div>
					))}
				</div>

				{/* see on Mobile mode */}
				<div className='flex h-auto flex-col divide-y divide-black/20 md:hidden'>
					{footerData.map(({ header, links }, i) => (
						<DropDown
							key={i}
							title={header}
							links={links}
						/>
					))}
				</div>

				<hr />
				<div className='mt-5'>
					<div className={style.footer_links_item}>
						<h1>
							@{new Date().getFullYear()} CodeInn. All
							right reserved.
						</h1>
					</div>
					<div className=''>
						<Link
							href='/terms'
							className={style.footer_links_item}
						>
							<div>
								<h1>Term & Conditions</h1>
							</div>
						</Link>
						<Link
							href='/privacy'
							className={style.footer_links_item}
						>
							<div>
								<h1>Privacy</h1>
							</div>
						</Link>
						<Link
							href='/Security'
							className={style.footer_links_item}
						>
							<div>
								<h1>Security</h1>
							</div>
						</Link>
					</div>
				</div>
				<hr />

				<div className='text-[1.2rem] mt-3 font-[300] text-black/80'>
					<h1>{ttechVietNamInfo.tenCongTy}</h1>
					<h1>ĐKKD: {ttechVietNamInfo.dkkd}</h1>
					<h1>
						Số ĐKKD/KD-0137: {ttechVietNamInfo.soDKKD}
					</h1>
					<h1>
						Ngày Cấp ĐKKD:{" "}
						{ttechVietNamInfo.ngayCapDKKD}
					</h1>
					<h1>
						Ngày Cấp Phép Kinh Doanh:{" "}
						{ttechVietNamInfo.ngayCapPhepKinhDoanh}
					</h1>
					<h1>Địa Chỉ: {ttechVietNamInfo.diaChi}</h1>
					<h1>
						Điện Thoại: {ttechVietNamInfo.dienThoai}
					</h1>
				</div>

				<div className='my-5'>
					<Image
						alt=''
						src={"/images/0.5x/Asset1@0.5x.png"}
						width={150}
						height={40}
					/>
				</div>
			</div>
		</div>
	)
}

export default Footer

const footerData = [
	{
		header: "Dành cho doanh nghiệp",
		links: [
			{
				text: "TTECH và doanh nghiệp",
				href: "/TTECH",
			},
			{
				text: "Mua hàng cho doanh nghiệp",
				href: "/business",
			},
		],
	},
	{
		header: "Mua sắm và tìm hiểu",
		links: [
			{ text: "Cửa hàng", href: "/store" },
			{ text: "Laptop", href: "/laptop" },
			{ text: "Phone", href: "/phone" },
			{ text: "Desktop", href: "/desktop" },
		],
	},
	{
		header: "Thông tin liên hệ",
		links: [
			{ text: "Địa chỉ", href: "/store" },
			{
				text: "Số điện thoại liên hệ",
				href: "/laptop",
			},
			{
				text: "Địa chỉ email liên hệ",
				href: "/phone",
			},
		],
	},
	{
		header: "Giá trị cốt lõi của TTECH",
		links: [
			{ text: "Trợ Năng", href: "/store" },
			{ text: "Môi Trường", href: "/laptop" },
			{ text: "Quyền Riêng Tư", href: "/phone" },
			{
				text: "Trách Nhiệm Nhà Cung Cấp",
				href: "/desktop",
			},
		],
	},
	{
		header: "Chính sách",
		links: [
			{
				text: "Chính sách bảo hành",
				href: "/store",
			},
			{
				text: "Chính sách thanh toán",
				href: "/laptop",
			},
			{
				text: "Chính sách giao hàng",
				href: "/phone",
			},
			{
				text: "Chính sách bảo mật",
				href: "/desktop",
			},
		],
	},
]

const ttechVietNamInfo = {
	tenCongTy: "Công Ty TNHH TTech Việt Nam",
	dkkd: "349873454968",
	soDKKD: "6983459823049/KD-0137",
	ngayCapDKKD: "28 tháng 10 năm 2023",
	ngayCapPhepKinhDoanh: "23 tháng 5 năm 2023",
	diaChi: `Phòng 901, Cung điện Ánh Sáng, số Gì Ra, đường Chim Bay, Thành phố Nào Vừa Đi Đã Mỏi, Unknown`,
	dienThoai: "(+84) 944552050",
}
