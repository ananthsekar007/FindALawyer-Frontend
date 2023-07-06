import LawyerLayout from "../../components/lawyer/LawyerLayout";
import React, { useState, useEffect } from "react";
import { Appointment } from "../../types/AppointmentType";
import { getLawyer } from "../../constants/LocalStorage";
import { getLawyerAppointments } from "../../api/appointment/appointmentApi";
import { AppointmentTypes } from "../../constants/AppConstants";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

const LawyerHome = () => {
  const [pendingAppointments, setPendingAppointments] = useState<Appointment[]>(
    []
  );

  const navigate = useNavigate();

  const getPendingAppointments = async () => {
    const lawyer = getLawyer();
    if (!lawyer) return;
    const response = await getLawyerAppointments(
      lawyer.lawyerId,
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
    <LawyerLayout>
      <div className="grid grid-cols-1 w-full p-5 gap-3 md:grid-cols-2">
        <div className="w-full h-56 md:h-64 bg-white rounded shadow p-5">
          <p className="font-semibold text-start">Pending Appointments</p>
          <div className="w-full h-36 md:h-44 bg-slate-100 rounded mt-3 grid grid-cols-4 text-sm p-3 overflow-y-scroll">
            <p className="font-semibold">Name</p>
            <p className="col-span-2 font-semibold ">Description</p>
            <p className="font-semibold justify-self-center mb-6">Action</p>
            {pendingAppointments.length > 0 &&
              pendingAppointments.map((appointment, index) => (
                <>
                  <p className="justify-self-start h-12">
                    {appointment.client.name}
                  </p>
                  <p className="col-span-2 h-12">
                    {appointment.caseDescription}
                  </p>
                  <Button
                    text="Chat"
                    onClick={() => {
                      console.log("clicked");
                      navigate(`/lawyer/chat`, {
                        state: {
                            appointment
                        }
                      });
                    }}
                    className="h-fit w-16 justify-self-center"
                  />
                  {/* <div className="bg-yellow-600  text-white rounded-xl h-fit p-1 px-2 justify-self-center">
                    {appointment.status}
                  </div> */}
                </>
              ))}
          </div>
        </div>
        <div className="w-full h-56 md:h-64 bg-white  rounded shadow"></div>
        <div className="w-full h-56 md:h-64 bg-white rounded shadow"></div>
        <div className="w-full h-56 md:h-64 bg-white rounded shadow"></div>
      </div>
    </LawyerLayout>
  );
};

export default LawyerHome;
