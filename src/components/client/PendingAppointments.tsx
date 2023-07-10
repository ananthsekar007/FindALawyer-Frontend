import React, { useState } from "react";
import { Appointment } from "../../types/AppointmentType";
import { Modal } from "react-responsive-modal";
import OutlinedButton from "../OutlinedButton";
import Button from "../Button";
import { updateAppointmentsForClient } from "../../api/appointment/appointmentApi";
import { AppointmentTypes } from "../../constants/AppConstants";

interface PendingAppointmentProps {
  pendingAppointments: Appointment[];
  onCancelSuccess: () => void;
}

function PendingAppointments({
  pendingAppointments,
  onCancelSuccess,
}: PendingAppointmentProps) {
  const [cancelModalOpen, setCancelModalOpen] = useState<boolean>(false);
  const [loading, setloading] = useState<boolean>(false);
  const [currentAppointment, setCurrentAppointment] = useState<Appointment>();

  const cancelAppointment = async (appointmentId: number) => {
    setloading(true);
    const response = await updateAppointmentsForClient(
      appointmentId,
      AppointmentTypes.REJECTED
    );
    setloading(false);
    setCancelModalOpen(false);
    if (!response.data) return;
    onCancelSuccess();
  };

  return (
    <>
      <p className="text-center font-semibold">Pending Appointments</p>
      <div className="w-full h-36 md:h-44 bg-slate-100 rounded mt-3 grid grid-cols-4 text-sm p-3 overflow-y-auto">
        <p className="font-semibold">Name</p>
        <p className="col-span-2 font-semibold ">Description</p>
        <p className="font-semibold justify-self-center mb-4">Status</p>
        {pendingAppointments.length > 0 &&
          pendingAppointments.map((appointment, _) => (
            <>
              <p className="justify-self-start h-12">
                {appointment.lawyer.name}
              </p>
              <p className="col-span-2 h-12">{appointment.caseDescription}</p>
              <div
                className="bg-yellow-600 w-20 text-center cursor-pointer  text-white rounded-xl h-fit p-1 px-2 justify-self-center"
                onClick={() => {
                  setCurrentAppointment(appointment);
                  setCancelModalOpen(true);
                }}
              >
                {appointment.status}
              </div>
            </>
          ))}
      </div>
      <Modal
        open={cancelModalOpen}
        onClose={() => {
          setCancelModalOpen(false);
        }}
        center
        classNames={{
          modal: "w-5/6",
        }}
      >
        <>
          <p className="font-bold text-lg mt-10">
            Are you sure you want to cancel the appointment?
          </p>
          <div className="flex  gap-3 mt-5 justify-center md:justify-end">
            <OutlinedButton
              text="Discard"
              className="w-fit"
              onClick={() => {
                setCancelModalOpen(false);
              }}
            />
            <Button
              text="Cancel"
              className="w-fit"
              loading={loading}
              onClick={() => {
                if (!currentAppointment) return;
                cancelAppointment(currentAppointment.appointmentId);
              }}
            />
          </div>
        </>
      </Modal>
    </>
  );
}

export default PendingAppointments;
