import { BookingFormData } from "../../components/appointment/BookAppointmentModal";
import { AppointmentTypes } from "../../constants/AppConstants";
import { axiosClientInstance, axiosLawyerInstance } from "../axios";

export const bookAppointment = (data: BookingFormData) => {
  return axiosClientInstance.post("/appointment/book", data);
};

export const getClientAppointments = (clientId: number, status: string) => {
  return axiosClientInstance.get(
    `/appointment/client/get?clientId=${clientId}&status=${status}`
  );
};

export const getLawyerAppointments = (lawyerId: number, status: string) => {
  return axiosClientInstance.get(
    `/appointment/lawyers/get?lawyerId=${lawyerId}&status=${status}`
  );
};

export const updateAppointmentsForClient = (
  appointmentId: number,
  status: string
) => {
  return axiosClientInstance.put("/appointment/update", {
    appointmentId,
    status,
  });
};

export const updateAppointmentsForLawyer = (
  appointmentId: number,
  status: string
) => {
  return axiosLawyerInstance.put("/appointment/update", {
    appointmentId,
    status,
  });
};

export const completeAppointmentForLawyer = (appointmentId: number) => {
  return axiosLawyerInstance.put("/appointment/complete", {
    appointmentId,
    status: AppointmentTypes.COMPELETED,
  });
};

export const completeAppointmentForClient = (appointmentId: number) => {
  return axiosClientInstance.put("/appointment/complete", {
    appointmentId,
    status: AppointmentTypes.COMPELETED,
  });
};
