import React from "react";
import { Modal } from "react-responsive-modal";
import { useForm } from "react-hook-form";
import TextField from "../TextField";
import Button from "../Button";
import { getClient } from "../../constants/LocalStorage";
import { bookAppointment } from "../../api/appointment/appointmentApi";

interface BookAppointmentProps {
  open: boolean;
  onClose: () => void;
  lawyerId: number;
}

export type BookingFormData = {
  caseDescription: string;
  lawyerId: number;
  clientId: number;
};

const BookAppointmentModal = ({ onClose, open, lawyerId }: BookAppointmentProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormData>();

  const onBookingAppointment = async (data: BookingFormData) => {
    const currentClient = getClient();
    if(!currentClient) return;
    data.clientId = currentClient.clientId;
    data.lawyerId = lawyerId;
    const bookingResponse = await bookAppointment(data);
    if(!bookingResponse.data) return;
    alert(bookingResponse.data);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      center
      classNames={{
        modal: "w-5/6",
      }}
    >
      <p className="font-bold">Book Appointment</p>
      <form onSubmit={handleSubmit(onBookingAppointment)} className="mt-5 space-y-10 text-center">
        <TextField
          label="Enter the case description"
          name="caseDescription"
          id="caseDescription"
          multiline
          register={register}
          errors={errors}
          validationSchema={{
            required: {
              value: true,
              message: "Case description field is required!",
            },
          }}
        />
        <Button text="Book Appointment" className="w-full md:w-2/6" type="submit" />
      </form>
    </Modal>
  );
};

export default BookAppointmentModal;
