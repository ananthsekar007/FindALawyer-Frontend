import { Fragment } from "react";
import { Appointment } from "../../types/AppointmentType";

interface RejectedLawyerAppointmentProps {
  rejectedAppointments: Appointment[];
}

function RejectedLawyerAppointments({
  rejectedAppointments,
}: RejectedLawyerAppointmentProps) {
  return (
    <Fragment>
      <p className="text-center font-semibold">Rejected Appointments</p>
      <div className="w-full h-36 md:h-44 bg-slate-100 rounded mt-3 grid grid-cols-4 text-sm p-3 overflow-y-auto">
        <p className="font-semibold">Name</p>
        <p className="col-span-2 font-semibold ">Description</p>
        <p className="font-semibold justify-self-center mb-4">Action</p>
        {rejectedAppointments.length > 0 &&
          rejectedAppointments.map((appointment, _) => (
            <>
              <p className="justify-self-start h-12">
                {appointment.lawyer.name}
              </p>
              <p className="col-span-2 min-h-max">
                {appointment.caseDescription}
              </p>
              <div className="bg-red-600 cursor-pointer  text-white rounded-xl h-fit p-1 px-2 justify-self-center">
                {appointment.status}
              </div>
            </>
          ))}
      </div>
    </Fragment>
  );
}

export default RejectedLawyerAppointments;
