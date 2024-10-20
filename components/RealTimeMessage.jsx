"use client"

import {
	addDoc,
	collection,
	onSnapshot,
	or,
	orderBy,
	query,
	serverTimestamp,
	where,
} from "firebase/firestore"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import {
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from "react"
import { BiMessageSquare } from "react-icons/bi"
import { CiMinimize1, CiPaperplane } from "react-icons/ci"
import { db } from "../firebaseConfig"

const RealTimeMessage = () => {
	const [showBox, setShowBox] = useState(false)
	const [newMessage, setNewMessage] = useState("")
	const [messageList, setMessageList] = useState([])
	const messagesRef = collection(db, "messages")
	const messagesEndRef = useRef(null)
	const ref = useRef(null)
	const containerRef = useRef()
	const userRef = useRef(null);
	let user = null
	useEffect(() => {
		if (localStorage.getItem('user')) {
			userRef.current = JSON.parse(localStorage.getItem('user'));
		}
		user = userRef.current;
		if (user?.user_id) {
			const queryMessages = query(
				messagesRef,
				where("roomId", "==", user?.user_id),
				orderBy("createdAt")
			)

			const unsubscribe = onSnapshot(
				queryMessages,
				(snapshot) => {
					let messages = []
					snapshot.forEach((doc) => {
						messages.push({ ...doc.data(), id: doc.id })
					})
					setNewMessage("")
					setMessageList(messages)
				}
			)

			return () => {
				unsubscribe()
			}
		}

	}, [messagesRef])

	useLayoutEffect(() => {
		if (containerRef.current) {
			containerRef.current.scrollTop = 99_999_999
		}
	}, [])

	const handleSubmit = async (e) => {
		if (newMessage === "") return

		await addDoc(messagesRef, {
			text: newMessage,
			userId: user.user_id,
			roomId: user.user_id,
			createdAt: serverTimestamp(),
		})

		containerRef.current.scrollTop = 99_999_999
		setNewMessage("")
	}

	const handleWhenShowBox = () => {
		setShowBox(true)
	}

	return (
		<>
			{user?.user_id && (
				<>
					<div
						className='fixed z-[21] bottom-[60px] md:bottom-[30px] p-2 rounded-2xl bg-pink-600 right-[30px]'
						onClick={handleWhenShowBox}
					>
						<BiMessageSquare size={25} color='white' />
					</div>

					<AnimatePresence>
						{showBox && (
							<motion.div
								initial={{ scale: 0, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								exit={{ scale: 0, opacity: 0 }}
								transition={{
									duration: 0.6,
									type: "spring",
								}}
								className='fixed origin-[90%_98%] z-[41] left-0 right-0 top-0 md:left-auto md:bottom-10 md:top-auto md:right-10 md:w-[300px] bottom-28'
							>
								<div
									onClick={() => setShowBox(false)}
									className='absolute inset-0 z-[40]'
								></div>

								<div className='relative  z-[42] bg-white'>
									<div className='flex  outline outline-black/10 justify-between items-center'>
										<div className='flex items-center gap-2 p-2'>
											<div>
												<Image
													src={"/images/0.5x/Asset_9@0.5x.png"}
													width={25}
													height={25}
													alt=''
													style={{ objectFit: "contain" }}
												/>
											</div>
											<div className='text-[1.6rem] font-[800]'>
												T-Tech
											</div>
										</div>
										<div
											className='p-2 m-2 bg-pink-600 rounded-2xl'
											onClick={() => {
												setShowBox(false)
											}}
										>
											<CiMinimize1 size={20} color='white' />
										</div>
									</div>
									<div
										ref={containerRef}
										className='flex customScrollBar flex-col bg-white text-[1.5rem] font-semibold p-4 text-black  h-[300px] overflow-y-scroll'
									>
										{messageList.map((x, i) => (
											<h1
												key={i}
												ref={
													i === messageList.length - 1
														? messagesEndRef
														: null
												}
												onClick={() => { }}
												style={{
													textAlign:
														x.userId == user.user_id ? "end" : "start",
												}}
											>
												{x?.text}
											</h1>
										))}
										<div ref={ref}></div>
									</div>
									<form
										onSubmit={(e) => e.preventDefault()}
										className='flex gap-2 items-center p-2 outline outline-black/10'
									>
										<motion.input
											whileFocus={{
												outline: "1px solid black",
												borderRadius: "10px",
											}}
											value={newMessage}
											onChange={(e) => setNewMessage(e.target.value)}
											type='text'
											placeholder='text here'
											className='text-[2rem] md:text-[1.6rem] outline-none font-bold w-full px-3'
										/>
										<button
											className='p-2 bg-pink-600 rounded-2xl'
											onClick={handleSubmit}
										>
											<CiPaperplane size={20} color='white' />
										</button>
									</form>
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</>
			)}
		</>
	)
}

export default RealTimeMessage