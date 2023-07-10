import { Appointment } from "./AppointmentType"

export type Payment = {
    paymentId: number,
    appointmentId: number,
    amount: number,
    status: string,
    paymentReferenceId: number,
    createdAt: Date,
    updatedAt: Date,
    appointment: Appointment,
    razorPayments: RazorPayments
}

export type RazorPayments = {
    razorPayId: number,
    paymentOrderId: string,
    paymentId?: string,
    amount: number,
    createdAt: Date,
    updatedAt: Date
}