import { axiosClientInstance } from "../axios";

export const listAllLawyers = () => {
  return axiosClientInstance.get("/lawyer/getall");
};

export interface RateLawyersBody {
  lawyerId: number;
  clientId: number;
  ratingValue: number;
  remarks: string;
}

export const rateLawyers = (data: RateLawyersBody) => {
  return axiosClientInstance.post("/lawyer/rate", data);
};
