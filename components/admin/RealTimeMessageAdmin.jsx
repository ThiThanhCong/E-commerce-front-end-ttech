"use client";

import { UserAuth } from "@/context/AuthContext";
import { db } from "@/firebaseConfig";
import {
  addDoc,
  collection,
  onSnapshot,
  or,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";

const ADMIN_ID = "day_la_admin_934857lkghjo834kjasg34958hrg";
const USER_ID = "day_la_user_934857lkghjo834kjasg34958hrg";

const RealTimeMessageAdmin = () => {
  const [showBox, setShowBox] = useState(true);
  const [newMessage, setNewMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const messagesRef = collection(db, "messages");
  const messagesEndRef = useRef();

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      or(where("userId", "==", USER_ID), where("userId", "==", ADMIN_ID)),
      orderBy("createdAt")
    );

    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setNewMessage("");
      setMessageList(messages);
    });

    return () => {
      unsubscribe();
    };
  }, [messagesRef]);

  const handleSubmit = async (e) => {
    if (newMessage === "") return;

    await addDoc(messagesRef, {
      message: newMessage,
      userId: ADMIN_ID,
      createdAt: serverTimestamp(),
    });

    setNewMessage("");

    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <div onClick={() => setShowBox(true)}>chatboxAdminIcon</div>

      {showBox && (
        <div className="">
          <div className="w-[400px] right-10 bottom-10">
            <div>
              <div>logo</div>
              <div>name</div>
              <div
                onClick={() => {
                  setShowBox(false);
                }}
              >
                close
              </div>
            </div>
            <div className="flex flex-col bg-gray-600 text-white h-[200px] overflow-y-scroll admin">
              {messageList.map((x, i) => (
                <h1
                  key={i}
                  ref={i === messageList.length - 1 ? messagesEndRef : null}
                  onClick={() => {
                    console.log(x);
                  }}
                  style={{
                    textAlign: x.userId == ADMIN_ID ? "end" : "start",
                  }}
                >
                  {x?.message}
                </h1>
              ))}
            </div>
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                type="text"
                placeholder="text here"
              />
              <button onClick={handleSubmit}>senbuttonAdmin</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default RealTimeMessageAdmin;