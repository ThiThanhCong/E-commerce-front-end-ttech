"use client"

import { db } from "@/firebaseConfig"
import {
	addDoc,
	collection,
	getDocs,
	onSnapshot,
	orderBy,
	query,
	serverTimestamp,
	where,
} from "firebase/firestore"
import { motion } from "framer-motion"
import { useCallback, useEffect, useState } from "react"
import { CiChat2 } from "react-icons/ci"

const ADMIN_ID =
	"day_la_admin_934857lkghjo834kjasg34958hrg"

const CustomerMessage = () => {
	const [room, setRoom] = useState([])
	const [newMessage, setNewMessage] = useState("")
	const messagesRef = collection(db, "messages")

	const [currentRoomClick, setCurrentRoomClick] =
		useState("")

	const handleRoom = useCallback(async () => {
		const rooms = [];
		const queryMessages = query(messagesRef);

		const allMessage = await getDocs(queryMessages);

		allMessage.forEach((doc) => {
			rooms.push(doc.data().roomId);
		});
		setRoom([...new Set(rooms)]);
	}, [messagesRef]);

	const [messageList, setMessageList] = useState(
		[]
	)

	useEffect(() => {
		const queryMessages = query(
			messagesRef,
			where("roomId", "==", currentRoomClick),
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
	}, [currentRoomClick, messagesRef])

	const handleSubmit = async (e) => {
		if (newMessage === "") return

		await addDoc(messagesRef, {
			text: newMessage,
			userId: ADMIN_ID,
			roomId: currentRoomClick,
			createdAt: serverTimestamp(),
		})

		setNewMessage("")
	}
	useEffect(() => {
		handleRoom()
	}, [messagesRef, handleRoom])

	return (
		<div className='container mx-auto mt-10 bg-white'>
			<div className='flex gap-10'>
				<div className='w-1/5 shrink-0 p-4 flex flex-col divide-y divide-black/10 justify-start items-start rounded-xl'>
					<h1 className='font-bold text-3xl mb-2 flex items-center gap-2'>
						<CiChat2 size={20} /> <h1>Tin nhắn</h1>
					</h1>

					{room.map((x, i) => {
						return (
							<motion.div
								key={i}
								variants={variants}
								initial='initial'
								animate={
									x === currentRoomClick
										? "animate"
										: "initial"
								}
								className='font-semibold text-2xl block cursor-pointer w-full p-2'
								onClick={() => setCurrentRoomClick(x)}
							>
								{x.slice(0, 20)}...
							</motion.div>
						)
					})}
				</div>
				<div className='grow h-[70vh] flex flex-col justify-between bg-blue-500/10 p-4 rounded-xl'>
					<div className='flex flex-col overscroll-y-scroll font-[500] text-2xl'>
						{messageList.map((x, i) => (
							<h1
								key={i}
								style={{
									textAlign:
										x.userId == ADMIN_ID ? "end" : "start",
								}}
							>
								{x.text}
							</h1>
						))}
					</div>
					<form
						onSubmit={(e) => e.preventDefault()}
						className='flex'
					>
						<motion.input
							variants={input_variant}
							initial='initial'
							whileFocus='animate'
							className='w-full border border-black/30 rounded-xl outline-none text-3xl font-[500] px-4 py-2 '
							placeholder='Enter Text'
							type='text'
							onChange={(e) => {
								setNewMessage(e.target.value)
							}}
							value={newMessage}
						/>

						<button onClick={handleSubmit}>
							submit
						</button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default CustomerMessage

const variants = {
	initial: {
		opacity: 0.6,
		backgroundColor: "white",
	},
	animate: {
		opacity: 1,
		backgroundColor: "#e0f2fe",
		transition: {
			delay: 0.2,
		},
	},
}

const input_variant = {
	initial: {
		opacity: 0.6,
		border: "black solid 1px",
	},
	animate: {
		opacity: 1,
		border: "#2563eb solid 1px",
		transition: {
			delay: 0.2,
		},
	},
}
