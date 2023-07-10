import React, { Fragment } from "react";
import { Appointment } from "../../types/AppointmentType";
import { useNavigate } from "react-router-dom";

interface CompletedAppointmentProps {
  completedAppointments: Appointment[];
}

function CompletedAppointments({
  completedAppointments,
}: CompletedAppointmentProps) {
  const navigate = useNavigate();

  return (
    <Fragment>
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
              <p className="col-span-2 h-12">{appointment.caseDescription}</p>
              <div
                className="bg-blue-500 cursor-pointer  text-white rounded-xl h-fit p-1 px-2 justify-self-center"
                onClick={() => {
                  navigate("/client/chat", {
                    state: {
                      appointment,
                      completed: true,
                    },
                  });
                }}
              >
                {appointment.status}
              </div>
            </>
          ))}
      </div>
    </Fragment>
  );
}

export default CompletedAppointments;
