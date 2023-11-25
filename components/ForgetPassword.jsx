"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { CiMinimize1 } from "react-icons/ci"
import Notification from "./Notification"
import { handleUser } from "@/app/api/handleUser"
import CircleLoader from "./CircleLoader"

const ForgetPassword = () => {
    const [show, setShow] = useState(false)
    const [notifications, setNotifications] = useState(false)
    const [data, setData] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {
        setLoading(true)
        const result = await handleUser.forgetPassword(data)
        console.log(result)
        setLoading(false)
        setNotifications(true)
    }

    return (
        <div className='z-[30]'>
            <h1
                onClick={() => setShow(true)}
                className=' cursor-pointer text-blue-400 text-right font-[500] text-xl'
            >
                Quên mật khẩu
            </h1>

            {notifications && (
                <Notification
                    notification={{
                        text: "Mật khẩu xác nhận đã được gửi đến email",
                        style: "success",
                        duration: 2000,
                    }}
                    notifications={notifications}
                    setNotifications={setNotifications}
                />
            )}

            <AnimatePresence>
                {show && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        exit={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className='fixed inset-0 text-5xl '
                    >
                        <div
                            className='absolute inset-0 bg-black/20 z-[50]'
                            onClick={() => setShow(false)}
                        ></div>
                        <div className='absolute top-0 left-0 p-10 right-0 bottom-20 bg-white z-[51] flex items-center justify-center '>
                            <div className='absolute top-10 right-10'>
                                <CiMinimize1
                                    size={20}
                                    onClick={() => setShow(false)}
                                />
                            </div>

                            <div>
                                <div className=''>
                                    <label>Vui lòng nhập lại email:</label>
                                    <motion.input
                                        value={data}
                                        onChange={(e) => setData(e.target.value)}
                                        whileHover={{ margin: "5px 0 10px 0" }}
                                        whileFocus={{
                                            borderBottom: "2px solid rgb(96 165 250)",
                                        }}
                                        placeholder='abc@gmail.com'
                                        className='outline-none text-5xl font-[600] border border-b-2 w-full '
                                    />
                                </div>
                                <button
                                    onClick={handleSubmit}
                                    className='font-[700] bg-blue-400 rounded-2xl text-white w-full py-4 mt-2 border flex items-center justify-center'
                                >
                                    {loading ? <CircleLoader /> : "Xác nhận"}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default ForgetPassword