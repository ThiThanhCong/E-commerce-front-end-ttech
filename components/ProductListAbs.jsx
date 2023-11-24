import ProductSlide from "./ProductSlide"

const ProductListAbs = () => {
	return (
		<>
			{productListAbs.map((product, index) => (
				<ProductSlide
					key={index}
					title={product.title}
					categoryId={product.categoryId}
					imageHref={product.imageHref}
					styleForImage={product.styleForImage}
				/>
			))}
		</>
	)
}

export default ProductListAbs

export const productListAbs = [
	{
		title:
			"<div class='text-[2rem] leading-[22px]'><strong>To rõ</strong>, <strong>trầm ấm</strong> & <strong>trong trẻo</strong> </br> Tai nghe nhẹ nhàng khẳng định chất âm </div>",

		imageHref:
			"/images/product_images/headphone-review.png",
		styleForImage: undefined,
		categoryId: "4dEfG6zIjvp7oP8",
	},

	{
		title:
			"<div class='text-[2rem] leading-[22px] mx-auto'>Hiệu năng <strong>không tưởng</strong>, </br> <strong>không cần lo lắp đặt</strong> với đội ngũ tư vấn linh kiện </div>",

		imageHref:
			"/images/product_images/pccase-review.png",
		styleForImage: {
			scale: 1.2,
			marginTop: "50px",
		},
		categoryId: "9dEfGhIjKp6mN7o",
	},

	{
		title:
			"<div class='text-[2rem] leading-[22px] mx-auto'><strong>Nhỏ gọn</strong>, <strong>mạnh mẽ</strong> & mọi thứ trong tầm tay</div>",

		imageHref:
			"/images/product_images/cdbf8d324bad3764168f1999272d36e8-removebg-preview.png",
		styleForImage: {
			scale: 1.7,
			marginTop: "80px",
		},

		categoryId: "0PbC1aL2mN3oPqR",
	},

	{
		title:
			"<div class='text-[2rem] leading-[22px] mx-auto'>Màng hình <strong>vô cực</strong>, tối ưu trải nghiệm với hơn <strong><span class='bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-amber-200 via-violet-600 to-sky-900 text-white px-1'>1 tỉ màu</span></strong></div>",

		imageHref:
			"/images/product_images/Flow_-All-in-one-Desktop-PC_Computer_Cloud-Streaming_-10.png",
		styleForImage: {
			scale: 2.2,
			marginTop: "40px",
		},

		categoryId: "4d2fG9zIjv37oP8",
	},
]
