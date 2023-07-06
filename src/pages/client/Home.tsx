import { useEffect, useState } from "react";
import ClientLayout from "../../components/client/ClientLayout";
import { Appointment } from "../../types/AppointmentType";
import { getClient } from "../../constants/LocalStorage";
import { getClientAppointments } from "../../api/appointment/appointmentApi";
import { AppointmentTypes } from "../../constants/AppConstants";
import { useNavigate } from "react-router-dom";

const ClientHome = () => {
  const [pendingAppointments, setPendingAppointments] = useState<Appointment[]>(
    []
  );

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

  useEffect(() => {
    console.log({ pendingAppointments });
  }, [pendingAppointments]);

  useEffect(() => {
    getPendingAppointments();
  }, []);

  return (
    <ClientLayout>
      <div className="grid grid-cols-1 w-full p-5 gap-3 md:grid-cols-2">
        <div className="w-full h-56 md:h-64 bg-white rounded shadow p-5">
          <p className="text-center font-semibold">Pending Appointments</p>
          <div className="w-full h-36 md:h-44 bg-slate-100 rounded mt-3 grid grid-cols-4 text-sm p-3 overflow-y-scroll">
            <p className="font-semibold">Name</p>
            <p className="col-span-2 font-semibold ">Description</p>
            <p className="font-semibold justify-self-center mb-6">Status</p>
            {pendingAppointments.length > 0 &&
              pendingAppointments.map((appointment, index) => (
                <>
                  <p className="justify-self-start h-12">
                    {appointment.lawyer.name}
                  </p>
                  <p className="col-span-2 h-12">
                    {appointment.caseDescription}
                  </p>
                  <div
                    className="bg-yellow-600 cursor-pointer  text-white rounded-xl h-fit p-1 px-2 justify-self-center"
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
        <div className="w-full h-56 md:h-64 bg-white  rounded shadow"></div>
        <div className="w-full h-56 md:h-64 bg-white rounded shadow"></div>
        <div className="w-full h-56 md:h-64 bg-white rounded shadow"></div>
      </div>
    </ClientLayout>
  );
};

export default ClientHome;
