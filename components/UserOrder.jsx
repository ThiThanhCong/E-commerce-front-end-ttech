"use client"

import { handleOrder } from "@/app/api/handleOrder"
import { UserAuth } from "@/context/AuthContext"
import { convertToVND } from "@/utils/until"
import { AnimatePresence, motion } from "framer-motion"
import { useCallback, useEffect, useState } from "react"
import {
    CiBoxes,
    CiMaximize1,
    CiMinimize1,
} from "react-icons/ci"
import Image from "next/image"
import { IoCopyOutline } from "react-icons/io5"

const UserOrder = () => {
    const [showDetail, setShowDetail] = useState({})
    const [orderList, setOrderList] = useState([
        {
            orderId: "d73d9714-22e3-4700-9631-ed6ae590a8e8",
            createOrderAt: "2023-11-09T11:43:46",
            userId: "001",
            total: 3000000,
            detail_order: [
                {
                    product: {
                        product_id: "609bbadf-409f-48e0-9fff-4e2bea4b13f0",
                        name_pr: "Cục Gạch XX",
                        detail:
                            "Điện thoại rung mạnh, báo thức như còi xe tải. Siêu nặng và bền.",
                        price: 121212,
                        image: [
                            "https://localhost:7067/Upload/product/609bbadf-409f-48e0-9fff-4e2bea4b13f0/609bbadf-409f-48e0-9fff-4e2bea4b13f0_638351663329180378.webp",
                        ],
                    },
                    quantity_pr: 1,
                    price_pr: 121212,
                },
                {
                    product: {
                        product_id: "AKG001",
                        name_pr: "AKG Y500 Wireless",
                        detail:
                            "On-ear headphones, Bluetooth 4.2, multipoint connection",
                        price: 3000000,
                        image: [
                            "https://localhost:7067/Upload/product/AKG001/AKG001_1.jpg",
                        ],
                    },
                    quantity_pr: 1,
                    price_pr: 3000000,
                },
            ],
        },
    ])
    const {
        user,
        setUser,
        googleSignIn,
        logOutGoogle,
        setToken,
        token,
    } = UserAuth()

    const handleClick = (orderId) => {
        const newShowDetail = { ...showDetail }

        if (newShowDetail[orderId]) {
            delete newShowDetail[orderId]
        } else {
            newShowDetail[orderId] = orderId
        }

        setShowDetail(newShowDetail)
    }

    const getAllOrder = useCallback(async () => {
        try {
            const result = await handleOrder.getOrderByUserId(
                user,
                token
            )
            console.log(result)
            setOrderList(result)
        } catch (error) {
            console.log(error)
        }
    }, [token, user])

    function copy(text) {
        navigator.clipboard.writeText(text)
    }

    useEffect(() => {
        getAllOrder()
    }, [getAllOrder])

    return (
        <div className='container mx-auto text-2xl px-4 pt-4 pb-[500px]'>
            <h1 className='text-5xl font-[700] gap-5 mb-6 mt-10 flex items-center justify-center'>
                <CiBoxes /> Đơn hàng
            </h1>

            <ul className='flex flex-col gap-4'>
                <div className='flex gap-2'>
                    <h1 className='flex-1 text-center text-white/60 p-2 rounded-2xl bg-blue-400'>
                        Mã đơn hàng
                    </h1>
                    <h1 className='flex-1 text-center text-white/60 p-2 rounded-2xl bg-blue-400'>
                        Thời gian đặt hàng
                    </h1>
                    <h1 className='flex-1 text-center text-white/60 p-2 rounded-2xl bg-blue-400'>
                        Tổng cộng
                    </h1>

                    <h1 className='flex-1 text-center text-white/60 p-2 rounded-2xl bg-blue-400'>
                        Chi tiết
                    </h1>
                </div>
                <div className=''>
                    {orderList?.map((x, i) => (
                        <div key={i}>
                            <motion.div
                                variants={variant}
                                initial='initial'
                                animate={
                                    showDetail[x.order_id]
                                        ? "active"
                                        : "initial"
                                }
                                transition={{ type: "spring", delay: 0.1 }}
                                className='flex gap-1 xl:gap-2 p-4 rounded-2xl mb-6'
                            >
                                <motion.h1
                                    whileTap={{ color: "red" }}
                                    onClick={() => copy(x.order_id)}
                                    className='flex-1 shrink-0 flex items-center justify-center gap-2'
                                >
                                    {x?.order_id?.slice(0, 10)}...{" "}
                                    <IoCopyOutline size={15} />
                                </motion.h1>
                                <h1 className='flex-1 shrink-0 flex items-center justify-center'>
                                    {convertDate(x.order_id?.create_order_at)}
                                </h1>
                                <h1 className='flex-1 shrink-0 flex items-center justify-center'>
                                    {convertToVND(x.total || 0)}
                                </h1>
                                <motion.h1
                                    onClick={() => handleClick(x.order_id)}
                                    className='flex-1 shrink-0 flex items-center justify-center'
                                >
                                    <AnimatePresence>
                                        {!showDetail[x.order_id] ? (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                whileInView={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                            >
                                                <CiMaximize1 size={20} />
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                whileInView={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                            >
                                                <CiMinimize1 size={20} />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.h1>
                            </motion.div>
                            <AnimatePresence>
                                {showDetail[x.order_id] && (
                                    <motion.div
                                        initial={{ scaleY: 0.1, opacity: 0 }}
                                        whileInView={{ scaleY: 1, opacity: 1 }}
                                        exit={{ scaleY: 0.1, opacity: 0 }}
                                        className='flex flex-col gap-3 mt-2 origin-top'
                                    >
                                        <div className='flex gap-2'>
                                            <div className='flex-1 text-center bg-blue-500 text-white/90 py-2 rounded-3xl'></div>
                                            <div className='flex-[2] text-center bg-blue-500 text-white/90 py-2 rounded-3xl'>
                                                Tên
                                            </div>
                                            <div className='flex-[2] text-center bg-blue-500 text-white/90 py-2 rounded-3xl'>
                                                {" "}
                                                Giá
                                            </div>
                                            <div className='flex-[2] text-center bg-blue-500 text-white/90 py-2 rounded-3xl'>
                                                Số lượng
                                            </div>
                                        </div>

                                        {x.detail_order.map((y, j) => (
                                            <div key={j} className='flex pt-6 pb-4'>
                                                <div className='flex-1 text-center rounded-3xl'>

                                                    <Image
                                                        src={y.product.image[0].image_path}
                                                        alt="Product Image"
                                                        width={70}
                                                        height={70}
                                                        className='m-auto object-contain rounded-3xl'
                                                    />
                                                </div>
                                                <div className='flex-[2] flex items-center text-center justify-center'>
                                                    {y.product.name_pr}
                                                </div>
                                                <div className='flex-[2] flex items-center text-center justify-center'>
                                                    {" "}
                                                    {convertToVND(y.price_pr || 0)}{" "}
                                                </div>
                                                <div className='flex-[2] flex items-center text-center justify-center'>
                                                    {y.quantity_pr}{" "}
                                                </div>
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </ul>
        </div>
    )
}

export default UserOrder

const variant = {
    initial: { backgroundColor: "white" },
    active: { backgroundColor: "#bfdbfe" },
}

export const convertDate = (date) => {
    const datePortion = date ? date.slice(0, 10) : null;

    if (datePortion) {
        const [year, month, day] = datePortion.split("-");
        const formattedDate = `${day}/${month}/${year}`;
        return formattedDate;
    } else {
        return null;
    }
};

export function copy(text) {
    navigator.clipboard.writeText(text)
}