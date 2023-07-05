import { axiosClientInstance } from "../axios"

export const listAllLawyers = () => {
    return axiosClientInstance.get("/lawyer/getall");
}