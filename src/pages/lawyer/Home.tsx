import LawyerLayout from "../../components/lawyer/LawyerLayout";
import { useState, useEffect } from "react";
import { Appointment } from "../../types/AppointmentType";
import { getLawyer } from "../../constants/LocalStorage";
import { getLawyerAppointments } from "../../api/appointment/appointmentApi";
import { AppointmentTypes } from "../../constants/AppConstants";
import PendingLawyerAppointments from "../../components/lawyer/PendingLawyerAppointments";
import Loader from "../../components/Loader";
import ActiveLawyerAppointments from "../../components/lawyer/ActiveLawyerAppointments";
import RejectedLawyerAppointments from "../../components/lawyer/RejectedLawyerAppointments";
import CompletedLawyerAppointments from "../../components/lawyer/CompletedLawyerAppointments";

const LawyerHome = () => {
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
    const lawyer = getLawyer();
    if (!lawyer) return;
    const response = await getLawyerAppointments(
      lawyer.lawyerId,
      AppointmentTypes.PENDING
    );
    setPendingAppointments(response.data.response);
  };

  const getActiveAppointments = async () => {
    const lawyer = getLawyer();
    if (!lawyer) return;
    const response = await getLawyerAppointments(
      lawyer.lawyerId,
      AppointmentTypes.ACTIVE
    );
    setActiveAppointments(response.data.response);
  };

  const getRejectedAppointments = async () => {
    const lawyer = getLawyer();
    if (!lawyer) return;
    const response = await getLawyerAppointments(
      lawyer.lawyerId,
      AppointmentTypes.REJECTED
    );
    setRejectedAppointments(response.data.response);
  };

  const getCompletedAppointments = async () => {
    const client = getLawyer();
    if (!client) return;
    const response = await getLawyerAppointments(
      client.lawyerId,
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
    <LawyerLayout>
      {loading && <Loader />}
      <div className="grid grid-cols-1 w-full p-5 gap-3 md:grid-cols-2">
        <div className="w-full h-56 md:h-64 bg-white rounded shadow p-5">
          <PendingLawyerAppointments
            pendingAppointments={pendingAppointments}
            onSuccess={() => {
              getAllAppointments();
            }}
          />
        </div>
        <div className="w-full h-56 md:h-64 bg-white  rounded shadow p-5">
          <ActiveLawyerAppointments activeAppointments={activeAppointments} />
        </div>
        <div className="w-full h-56 md:h-64 bg-white rounded shadow p-5">
          <RejectedLawyerAppointments
            rejectedAppointments={rejectedAppointments}
          />
        </div>
        <div className="w-full h-56 md:h-64 bg-white rounded shadow p-5">
          <CompletedLawyerAppointments
            completedAppointments={completedAppointments}
          />
        </div>
      </div>
    </LawyerLayout>
  );
};

export default LawyerHome;
