import React, { Fragment } from "react";
import { Appointment } from "../../types/AppointmentType";
import { useNavigate } from "react-router-dom";

interface ActiveLawyerAppointmentProps {
  activeAppointments: Appointment[];
}

function ActiveLawyerAppointments({
  activeAppointments,
}: ActiveLawyerAppointmentProps) {
  const navigate = useNavigate();

  return (
    <Fragment>
      <p className="text-center font-semibold">Active Appointments</p>
      <div className="w-full h-36 md:h-44 bg-slate-100 rounded mt-3 grid grid-cols-4 text-sm p-3 overflow-y-auto">
        <p className="font-semibold">Name</p>
        <p className="col-span-2 font-semibold ">Description</p>
        <p className="font-semibold justify-self-center mb-4">Action</p>
        {activeAppointments.length > 0 &&
          activeAppointments.map((appointment, _) => (
            <>
              <p className="justify-self-start h-12">
                {appointment.lawyer.name}
              </p>
              <p className="col-span-2 min-h-max">
                {appointment.caseDescription}
              </p>
              <div
                className="bg-green-600 w-20 text-center cursor-pointer  text-white rounded-xl h-fit p-1 px-2 justify-self-center"
                onClick={() => {
                  navigate("/lawyer/chat", {
                    state: {
                      appointment,
                      completed: false,
                    },
                  });
                }}
              >
                Chat{" "}
              </div>
            </>
          ))}
      </div>
    </Fragment>
  );
}

export default ActiveLawyerAppointments;
