import { BookingFormData } from "../../components/appointment/BookAppointmentModal";
import { axiosClientInstance } from "../axios";

export const bookAppointment = (data: BookingFormData) => {
    return axiosClientInstance.post("/appointment/book", data);
}