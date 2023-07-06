import { useEffect, useState } from "react";
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
import { Chat } from "../lawyer/Chat";



const ClientChat = () => {
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
      type: "CLIENT",
      createdAt: serverTimestamp(),
      appointmentId: appointment?.appointmentId,
    });

    setMessage("");
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
        setMessages(chats);
      });
    }
  }, [appointment]);

  useEffect(() => {
      if (state && state.appointment) {
        console.log({state: state.appointment})
      setAppointment(state.appointment);
    }
  }, [state]);

  return (
    <LawyerLayout>
      <div className="flex flex-col items-center w-full mb-20">
        <div className="w-11/12 h-12 rounded-t-md p-3 bg-white shadow">
          <p className="font-semibold text-lg">{appointment?.lawyer.name}</p>
        </div>
        <div className="w-11/12 h-80 bg-slate-100 shadow p-5 flex flex-col overflow-auto space-y-5">
          {messages.map((chat, index) => {
            if (chat.type === "LAWYER") {
              return (
                <div
                  key={index}
                  className="bg-white max-w-xs rounded-xl shadow self-start p-5"
                >
                  {chat.message}
                </div>
              );
            } else {
              return (
                <div
                  key={index}
                  className="self-end p-5 max-w-xs rounded-xl shadow text-white bg-gradient-to-br from-blue-500 to-purple-500"
                >
                  {chat.message}
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

export default ClientChat;
