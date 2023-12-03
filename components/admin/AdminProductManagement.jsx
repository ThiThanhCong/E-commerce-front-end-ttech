"use client"

import { useState } from "react"
import ProductAction from "./productManagement/ProductAction"
import ProductManagementForm from "./productManagement/ProductManagementForm"
import ProductRenderList from "./productManagement/ProductRenderList"
import useDebounce from "@/customHook/useDeboune"
import { useEffect } from "react"
import { handleProduct } from "@/app/api/handleProduct"
import { handleCategory } from "@/app/api/handleCategory"
import { handleSupplier } from "@/app/api/handleSupplier"
import { axiosClient } from "@/app/api/axiosClient"
import { UserAuth } from "@/context/AuthContext"

const AdminProductManagement = () => {
	const [currentProductChoose, setCurrentProductChoose] =
		useState({})

	const [filter, setFilter] = useState({
		pageNumber: 1,
		pageSize: 999_999,
	})

	const [triggerImage, setTriggerImage] = useState(false)
	const [trigger, setTrigger] = useState(false)
	const { token, user } = UserAuth();
	const [list, setList] = useState([
		{
			product: {
				product_id: "PRD005",
				name_pr: "Apple MacBook Air",
				name_serial: "MA007",
				detail:
					"13.3-inch Retina display, Apple M1 chip, 8GB RAM, 256GB SSD, macOS",
				price: 17000000,
				quantity_pr: 25,
				guarantee_period: 12,
			},
			category: {
				category_id: "qRsTuV4wXyZ56789",
				category_name: "Laptop",
			},
			supplier: {
				supplier_id: "SUPLLIER002",
				supplier_name: "Apple",
			},
			image: {
				image_id: "PRD005001",
				product_id: "PRD005",
				image_href:
					"https://localhost:7067/Upload/product/PRD005/PRD005_1.jpg",
			},
		},
	])
	const [supplier, setSupplier] = useState([
		{
			supplier_id: "1a58c6e8-361e-4c2f-9643-c81b125080e8",
			supplier_name: "Bullshit",
		},
	])

	const [category, setCategory] = useState([
		{
			category_id: "0PbC1aL2mN3oPqRs",
			category_name: "Điện thoại di động",
		},
	])

	const [allImageOfProduct, setAllImageOfProduct] = useState(
		[
			{
				image_id: "941cfd80-88e7-4011-832d-87102006b9c6",
				product_id: "573e78ba-2cfa-4bac-b6a4-c10dc67d6007",
				image_href:
					"https://localhost:7067/Upload/product/573e78ba-2cfa-4bac-b6a4-c10dc67d6007/573e78ba-2cfa-4bac-b6a4-c10dc67d6007_638355677595152972.jpg",
			},
		]
	)

	const getAllImage = async () => {
		try {
			const result = await handleProduct.getAllImageOfProduct(
				currentProductChoose?.product_id
			)
			setAllImageOfProduct(result)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		getAllImage()
	}, [currentProductChoose, triggerImage])

	const getData = async () => {
		try {
			console.log("token is: ", token)
			const supplier = await handleSupplier.getAllSupplier(token)
			const category = await handleCategory.getAllCategories()

			setSupplier(supplier)
			setCategory(category)
		} catch (error) { }
	}

	useEffect(() => {
		getData()
	}, [])

	const filterDebounce = useDebounce(filter, 1000)

	const getProduct = async () => {
		try {
			const products = await handleProduct.getProduct(filter)
			setList(products?.Products)
			console.log("this is the filter: ", filterDebounce)
			console.log("this is list product: ", products)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		getProduct()
	}, [filterDebounce, trigger])

	return (
		<>
			<div className='container mx-auto mt-14 p-6 bg-white rounded-3xl'>
				<ProductAction
					setList={setList}
					filter={filter}
					setFilter={setFilter}
					setTrigger={setTrigger}
					category={category}
					setCategory={setCategory}
					supplier={supplier}
					setSupplier={setSupplier}
					currentProductChoose={currentProductChoose}
					setCurrentProductChoose={setCurrentProductChoose}
				/>
				<div className='flex gap-3 mt-4 flex-1'>
					<ProductRenderList
						filter={filterDebounce}
						list={list}
						setList={setList}
						setCurrentProductChoose={setCurrentProductChoose}
						currentProductChoose={currentProductChoose}
					/>
					<div className=''>
						<ProductManagementForm
							setCurrentProductChoose={setCurrentProductChoose}
							currentProductChoose={currentProductChoose}
							category={category}
							setCategory={setCategory}
							supplier={supplier}
							setSupplier={setSupplier}
							allImageOfProduct={allImageOfProduct}
							setAllImageOfProduct={setAllImageOfProduct}
							triggerImage={triggerImage}
							setTriggerImage={setTriggerImage}
						/>
					</div>
				</div>
			</div>
		</>
	)
}

export default AdminProductManagement