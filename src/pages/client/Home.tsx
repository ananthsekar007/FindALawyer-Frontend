import { useEffect, useState } from "react";
import ClientLayout from "../../components/client/ClientLayout";
import { Appointment } from "../../types/AppointmentType";
import { getClient } from "../../constants/LocalStorage";
import { getClientAppointments } from "../../api/appointment/appointmentApi";
import { AppointmentTypes } from "../../constants/AppConstants";
import Loader from "../../components/Loader";
import PendingAppointments from "../../components/client/PendingAppointments";
import ActiveAppointments from "../../components/client/ActiveAppointments";
import RejectedAppointments from "../../components/client/RejectedAppointments";
import CompletedAppointments from "../../components/client/CompletedAppointments";

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
          <PendingAppointments
            pendingAppointments={pendingAppointments}
            onCancelSuccess={() => {
              getAllAppointments();
            }}
          />
        </div>
        <div className="w-full h-56 md:h-64 bg-white  rounded shadow-xl p-5">
          <ActiveAppointments activeAppointments={activeAppointments} />
        </div>
        <div className="w-full h-56 md:h-64 bg-white rounded shadow-xl p-5">
          <RejectedAppointments rejectedAppointments={rejectedAppointments} />
        </div>
        <div className="w-full h-56 md:h-64 bg-white rounded shadow-xl p-5">
          <CompletedAppointments
            completedAppointments={completedAppointments}
          />
        </div>
      </div>
    </ClientLayout>
  );
};

export default ClientHome;
