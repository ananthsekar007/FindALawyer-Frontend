import { BookingFormData } from "../../components/appointment/BookAppointmentModal";
import { axiosClientInstance } from "../axios";

export const bookAppointment = (data: BookingFormData) => {
    return axiosClientInstance.post("/appointment/book", data);
}

export const getClientAppointments = (clientId: number, status: string) => {
    return axiosClientInstance.get(`/appointment/client/get?clientId=${clientId}&status=${status}`);
}

export const getLawyerAppointments = (lawyerId: number, status: string) => {
    return axiosClientInstance.get(`/appointment/client/get?clientId=${lawyerId}&status=${status}`);
}