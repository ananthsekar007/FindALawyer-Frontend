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
import { firebaseDb, storage } from "../../firebase/firebase-config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Payment } from "../../types/PaymentTypes";
import { getPaymentsForLawyers } from "../../api/payments/paymentsApi";
import RequestMoneyModal from "../../components/lawyer/RequestMoneyModal";
import { PaymentStatusColors } from "../../constants/AppConstants";
import CompleteAppointmentModalForLawyer from "../../components/lawyer/CompleteAppointmentForLawyer";

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
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [completeModalOpen, setCompleteModalOpen] = useState<boolean>(false);

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
    if (chatContainerRef && chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  const handleFileUpload = async (event: any) => {
    const file = event.target.files[0];
    console.log("Uploaded file:", file);
    if (appointment && appointment.appointmentId) {
      try {
        const storageRef = ref(
          storage,
          `files-${appointment?.appointmentId}/${file.name}`
        );

        console.log("the ref for storage", { storageRef });

        const fileUploadResponse = await uploadBytes(storageRef, file);
        console.log({ fileUploadResponse });

        const url = await getDownloadURL(fileUploadResponse.ref);
        setMessage(url);
      } catch (err) {
        console.log({ err });
      }
    } else {
      console.log("Error");
    }
  };

  const getPayments = async (appointmentId?: number) => {
    if (!appointmentId) return;
    const response = await getPaymentsForLawyers(appointmentId);
    if (!response.data) return;
    setPayments(response.data);
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
      getPayments(appointment.appointmentId);
    }
  }, [appointment]);

  useEffect(() => {
    if (state && state.appointment) {
      setIsCompleted(state.completed);
      setAppointment(state.appointment);
    }
  }, [state]);

  return (
    <LawyerLayout>
      <div className="flex flex-col items-center w-full mb-20">
        <div className="w-11/12 h-12 rounded-t-md p-1 bg-white shadow-xl">
          <div className="flex w-full justify-between px-10">
            <p className="font-semibold text-lg">
              {appointment?.client?.name} {isCompleted && " - Chat History"}
            </p>
            <div className="h-10 flex space-x-3">
              <div className="bg-slate-200 w-10 rounded-full shadow hover:shadow-md items-center cursor-pointer flex justify-center">
                <label
                  htmlFor="file-upload"
                  className={`${
                    isCompleted ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
                >
                  <i className="fa-solid fa-paperclip"></i>
                </label>
                <input
                  id="file-upload"
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleFileUpload}
                  disabled={isCompleted}
                />
              </div>
              {!isCompleted && (
                <button
                  className="rounded-full bg-red-500 p-2 w-10 shadow hover:shadow-lg"
                  onClick={() => {
                    setCompleteModalOpen(true);
                  }}
                >
                  <i className="fas fa-times text-white"></i>
                </button>
              )}
            </div>
          </div>
        </div>
        <div
          ref={chatContainerRef}
          className="w-11/12 h-80 bg-slate-100 shadow-xl p-5 flex flex-col overflow-auto space-y-5"
        >
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
                  className="self-end p-5 max-w-xs md:max-w-md lg:max-w-lg rounded-xl shadow-xl text-white bg-gradient-to-br from-blue-500 to-purple-500"
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
        <div className="w-11/12 h-14 bg-white rounded-b-md shadow-xl">
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
        <div className="w-11/12 h-30 bg-white mt-10 rounded-md shadow-xl p-5 flex flex-col">
          <p className="text-center font-semibold text-lg">Payments {isCompleted && 'History'}</p>

          <div className="mt-10 relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Client Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Amount (in Rs)
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {payments &&
                  payments.length > 0 &&
                  payments.map((payment, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {payment?.appointment?.client?.name || "Ananth $"}
                      </th>
                      <td className="px-6 py-4">
                        {" "}
                        <b className="font-bold">Rs.</b> {payment.amount}
                      </td>
                      <td className="px-6 py-4">
                        <p
                          className={`${
                            (PaymentStatusColors as any)[payment.status]
                          } w-20 p-2 rounded-2xl text-white text-center `}
                        >
                          {payment.status}
                        </p>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {!isCompleted && (
            <Button
              text="Request Payment"
              className="mt-10 w-10 self-center"
              onClick={() => {
                setModalOpen(true);
              }}
            />
          )}
        </div>
      </div>
      <RequestMoneyModal
        open={modalOpen}
        appointmentId={appointment?.appointmentId}
        onClose={() => {
          setModalOpen(false);
        }}
        onSuccess={() => {
          getPayments(appointment?.appointmentId);
          setModalOpen(false);
        }}
      />
      <CompleteAppointmentModalForLawyer
        open={completeModalOpen}
        onClose={() => {
          setCompleteModalOpen(false);
        }}
        appointmentId={appointment?.appointmentId}
      />
    </LawyerLayout>
  );
};

export default LawyerChat;
