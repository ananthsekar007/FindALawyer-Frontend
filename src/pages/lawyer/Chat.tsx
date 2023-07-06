import { FormEvent, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import LawyerLayout from "../../components/lawyer/LawyerLayout";
import { Appointment } from "../../types/AppointmentType";
import Button from "../../components/Button";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { firebaseDb } from "../../firebase/firebase-config";

export interface Chat {
  type: string;
  message: string;
  appointmentId: number;
  createdAt: any;
}

const LawyerChat = () => {
  const { state } = useLocation();
  const [appointment, setAppointment] = useState<Appointment>();
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Chat[]>([]);

  const chatsRef = collection(firebaseDb, "chats");

  const handleSendMessage = async (e: any) => {
    e.preventDefault();
    if (message === "") return;

    await addDoc(chatsRef, {
      message,
      type: "LAWYER",
      createdAt: serverTimestamp(),
      appointmentId: appointment?.appointmentId,
    });

    setMessage("");
  };

  const chatContainerRef = useRef(null);

  // Scroll to the bottom of the chat container
  const scrollToBottom = () => {
    if(chatContainerRef && chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };


  useEffect(() => {
    if (appointment && appointment.appointmentId) {
      const queryMessage = query(
        chatsRef,
        where("appointmentId", "==", appointment.appointmentId),
        orderBy("createdAt", "desc")
      );
      onSnapshot(queryMessage, (snapshot) => {
        const chats: any = snapshot.docs.map((doc) => doc.data()).reverse();
        scrollToBottom();
        setMessages(chats);
      });
    }
  }, [appointment]);

  useEffect(() => {
    if (state && state.appointment) {
      setAppointment(state.appointment);
    }
  }, [state]);

  return (
    <LawyerLayout>
      <div className="flex flex-col items-center w-full mb-20">
        <div className="w-11/12 h-12 rounded-t-md p-3 bg-white shadow">
          <p className="font-semibold text-lg">{appointment?.client.name}</p>
        </div>
        <div ref={chatContainerRef} className="w-11/12 h-80 bg-slate-100 shadow p-5 flex flex-col overflow-auto space-y-5">
          {messages.map((chat, index) => {
            if (chat.type === "CLIENT") {
              return (
                <div
                  key={index}
                  className="bg-white max-w-xs md:max-w-md lg:max-w-lg rounded-xl shadow self-start p-5"
                >
                  <div style={{ overflow: "hidden" }}>
                    {chat.message.startsWith("https") ? (
                      <a
                        href={chat.message}
                        style={{ overflowWrap: "break-word" }}
                        target="_blank"
                      >
                        {chat.message}
                      </a>
                    ) : (
                      <p style={{ overflowWrap: "break-word" }}>
                        {chat.message}
                      </p>
                    )}
                  </div>
                </div>
              );
            } else {
              return (
                <div
                  key={index}
                  className="self-end p-5 max-w-xs md:max-w-md lg:max-w-lg rounded-xl shadow text-white bg-gradient-to-br from-blue-500 to-purple-500"
                >
                  <div style={{ overflow: "hidden" }}>
                    {chat.message.startsWith("https") ? (
                      <a
                        href={chat.message}
                        style={{ overflowWrap: "break-word" }}
                        target="_blank"
                      >
                        {chat.message}
                      </a>
                    ) : (
                      <p style={{ overflowWrap: "break-word" }}>
                        {chat.message}
                      </p>
                    )}
                  </div>
                </div>
              );
            }
          })}
        </div>
        <div className="w-11/12 h-14 bg-white rounded-b-md shadow">
          <form
            className="grid grid-cols-5 p-2 gap-2"
            onSubmit={handleSendMessage}
          >
            <input
              id={"messageLawyer"}
              name={"message"}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              className="p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 col-span-4"
            />
            <Button text="Send" type="submit" />
          </form>
        </div>
      </div>
    </LawyerLayout>
  );
};

export default LawyerChat;
