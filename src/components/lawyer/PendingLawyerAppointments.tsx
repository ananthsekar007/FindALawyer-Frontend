import React, { useState } from "react";
import { Appointment } from "../../types/AppointmentType";
import OutlinedButton from "../OutlinedButton";
import Button from "../Button";
import Modal from "react-responsive-modal";
import { updateAppointmentsForLawyer } from "../../api/appointment/appointmentApi";
import { AppointmentTypes } from "../../constants/AppConstants";

interface PendingLawyerAppointmentProps {
  pendingAppointments: Appointment[];
  onSuccess: () => void;
}

function PendingLawyerAppointments({
  pendingAppointments,
  onSuccess,
}: PendingLawyerAppointmentProps) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [confimLoading, setConfimLoading] = useState<boolean>(false);
  const [rejectLoading, setRejectLoading] = useState<boolean>(false);
  const [currentAppointment, setCurrentAppointment] = useState<Appointment>();

  const rejectedAppointment = async (appointmentId: number) => {
    setRejectLoading(true);
    const response = await updateAppointmentsForLawyer(
      appointmentId,
      AppointmentTypes.REJECTED
    );
    setRejectLoading(false);
    setModalOpen(false);
    if (!response.data) return;
    onSuccess();
  };

  const approveAppointment = async (appointmentId: number) => {
    setConfimLoading(true);
    const response = await updateAppointmentsForLawyer(
      appointmentId,
      AppointmentTypes.ACTIVE
    );
    setConfimLoading(false);
    setModalOpen(false);
    if (!response.data) return;
    onSuccess();
  };

  return (
    <>
      <p className="font-semibold text-center">Pending Appointments</p>
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
              <p className="col-span-2 h-12">{appointment.caseDescription}</p>
              <div
                className="bg-yellow-600  text-white rounded-xl h-fit p-1 px-2 justify-self-center cursor-pointer"
                onClick={() => {
                  setCurrentAppointment(appointment);
                  setModalOpen(true);
                }}
              >
                {appointment.status}
              </div>
            </>
          ))}
      </div>
      <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
        center
        classNames={{
          modal: "w-3/6",
        }}
      >
        <>
          <p className="font-bold text-lg mt-10">
            What would you like to do with this appointment ?
          </p>
          <div className="flex  gap-3 mt-5 justify-center md:justify-end">
            <OutlinedButton
              text="Reject"
              className="w-fit"
              loading={rejectLoading}
              onClick={() => {
                if (!currentAppointment) return;
                rejectedAppointment(currentAppointment.appointmentId);
              }}
            />
            <Button
              text="Approve"
              className="w-fit"
              loading={confimLoading}
              onClick={() => {
                if (!currentAppointment) return;
                approveAppointment(currentAppointment.appointmentId);
              }}
            />
          </div>
        </>
      </Modal>
    </>
  );
}

export default PendingLawyerAppointments;
