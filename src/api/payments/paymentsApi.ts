import { axiosClientInstance, axiosLawyerInstance } from "../axios";

export const requestPayment = async (appointmentId: number, amount: number) => {
  return axiosLawyerInstance.post("/payment/request", {
    appointmentId,
    amount,
  });
};

export const createPaymentOrder = async (paymentId: number, amount: number) => {
  return axiosClientInstance.post("/payment/create-order", {
    paymentId,
    amount,
  });
};

export const updatePaymentOnSuccess = async (
  orderId: string,
  paymentId: string
) => {
  return axiosClientInstance.post("/payment/success", {
    orderId,
    paymentId,
  });
};

export const getPaymentsForClients = async (appointmentId: number) => {
    return axiosClientInstance.get(`/payment/getall?appointmentId=${appointmentId}`);
}

export const getPaymentsForLawyers = async (appointmentId: number) => {
    return axiosLawyerInstance.get(`/payment/getall?appointmentId=${appointmentId}`);
}