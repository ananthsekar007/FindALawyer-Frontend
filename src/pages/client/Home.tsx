import { useEffect, useState } from "react";
import ClientLayout from "../../components/client/ClientLayout";
import { Appointment } from "../../types/AppointmentType";
import { getClient } from "../../constants/LocalStorage";
import { getClientAppointments } from "../../api/appointment/appointmentApi";
import { AppointmentTypes } from "../../constants/AppConstants";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";

const ClientHome = () => {
  const [pendingAppointments, setPendingAppointments] = useState<Appointment[]>(
    []
  );
  const [activeAppointments, setActiveAppointments] = useState<Appointment[]>(
    []
  );
  const [rejectedAppointments, setRejectedAppointments] = useState<
    Appointment[]
  >([]);
  const [completedAppointments, setCompletedAppointments] = useState<
    Appointment[]
  >([]);
  const [loading, setloading] = useState<boolean>(true);

  const navigate = useNavigate();

  const getPendingAppointments = async () => {
    const client = getClient();
    if (!client) return;
    const response = await getClientAppointments(
      client.clientId,
      AppointmentTypes.PENDING
    );
    setPendingAppointments(response.data.response);
  };

  const getActiveAppointments = async () => {
    const client = getClient();
    if (!client) return;
    const response = await getClientAppointments(
      client.clientId,
      AppointmentTypes.ACTIVE
    );
    setActiveAppointments(response.data.response);
  };

  const getRejectedAppointments = async () => {
    const client = getClient();
    if (!client) return;
    const response = await getClientAppointments(
      client.clientId,
      AppointmentTypes.REJECTED
    );
    setRejectedAppointments(response.data.response);
  };

  const getCompletedAppointments = async () => {
    const client = getClient();
    if (!client) return;
    const response = await getClientAppointments(
      client.clientId,
      AppointmentTypes.COMPELETED
    );
    setCompletedAppointments(response.data.response);
  };

  const getAllAppointments = async () => {
    setloading(true);
    await getPendingAppointments();
    await getActiveAppointments();
    await getRejectedAppointments();
    await getCompletedAppointments();
    setloading(false);
  };

  useEffect(() => {
    getAllAppointments();
  }, []);

  return (
    <ClientLayout>
      {loading && <Loader />}
      <div className="grid grid-cols-1 w-full p-5 gap-10 md:grid-cols-2">
        <div className="w-full h-56 md:h-64 bg-white rounded shadow-xl p-5">
          <p className="text-center font-semibold">Pending Appointments</p>
          <div className="w-full h-36 md:h-44 bg-slate-100 rounded mt-3 grid grid-cols-4 text-sm p-3 overflow-y-auto">
            <p className="font-semibold">Name</p>
            <p className="col-span-2 font-semibold ">Description</p>
            <p className="font-semibold justify-self-center">Status</p>
            {pendingAppointments.length > 0 &&
              pendingAppointments.map((appointment, _) => (
                <>
                  <p className="justify-self-start h-12">
                    {appointment.lawyer.name}
                  </p>
                  <p className="col-span-2 h-12">
                    {appointment.caseDescription}
                  </p>
                  <div className="bg-yellow-600 w-20 text-center cursor-pointer  text-white rounded-xl h-fit p-1 px-2 justify-self-center">
                    {appointment.status}
                  </div>
                </>
              ))}
          </div>
        </div>
        <div className="w-full h-56 md:h-64 bg-white  rounded shadow-xl p-5">
          <p className="text-center font-semibold">Active Appointments</p>
          <div className="w-full h-36 md:h-44 bg-slate-100 rounded mt-3 grid grid-cols-4 text-sm p-3 overflow-y-auto">
            <p className="font-semibold">Name</p>
            <p className="col-span-2 font-semibold ">Description</p>
            <p className="font-semibold justify-self-center">Action</p>
            {activeAppointments.length > 0 &&
              activeAppointments.map((appointment, _) => (
                <>
                  <p className="justify-self-start h-12">
                    {appointment.lawyer.name}
                  </p>
                  <p className="col-span-2 h-12">
                    {appointment.caseDescription}
                  </p>
                  <div
                    className="bg-green-600 w-20 text-center cursor-pointer  text-white rounded-xl h-fit p-1 px-2 justify-self-center"
                    onClick={() => {
                      navigate("/client/chat", {
                        state: {
                          appointment,
                        },
                      });
                    }}
                  >
                    Chat{" "}
                  </div>
                </>
              ))}
          </div>
        </div>
        <div className="w-full h-56 md:h-64 bg-white rounded shadow-xl p-5">
          <p className="text-center font-semibold">Rejected Appointments</p>
          <div className="w-full h-36 md:h-44 bg-slate-100 rounded mt-3 grid grid-cols-4 text-sm p-3 overflow-y-auto">
            <p className="font-semibold">Name</p>
            <p className="col-span-2 font-semibold ">Description</p>
            <p className="font-semibold justify-self-center">Action</p>
            {rejectedAppointments.length > 0 &&
              rejectedAppointments.map((appointment, _) => (
                <>
                  <p className="justify-self-start h-12">
                    {appointment.lawyer.name}
                  </p>
                  <p className="col-span-2 h-12">
                    {appointment.caseDescription}
                  </p>
                  <div className="bg-red-600 cursor-pointer  text-white rounded-xl h-fit p-1 px-2 justify-self-center">
                    {appointment.status}
                  </div>
                </>
              ))}
          </div>
        </div>
        <div className="w-full h-56 md:h-64 bg-white rounded shadow-xl p-5">
          <p className="text-center font-semibold">Completed Appointments</p>
          <div className="w-full h-36 md:h-44 bg-slate-100 rounded mt-3 grid grid-cols-4 text-sm p-3 overflow-y-auto">
            <p className="font-semibold">Name</p>
            <p className="col-span-2 font-semibold ">Description</p>
            <p className="font-semibold justify-self-center">Action</p>
            {completedAppointments.length > 0 &&
              completedAppointments.map((appointment, _) => (
                <>
                  <p className="justify-self-start h-12">
                    {appointment.lawyer.name}
                  </p>
                  <p className="col-span-2 h-12">
                    {appointment.caseDescription}
                  </p>
                  <div
                    className="bg-blue-500 cursor-pointer  text-white rounded-xl h-fit p-1 px-2 justify-self-center"
                    onClick={() => {
                      navigate("/client/chat", {
                        state: {
                          appointment,
                        },
                      });
                    }}
                  >
                    {appointment.status}
                  </div>
                </>
              ))}
          </div>
        </div>
      </div>
    </ClientLayout>
  );
};

export default ClientHome;
