import axios from "axios";
import { API_BASE_URL } from "../../constants/AppConstants";
import { UserLoginType } from "../../types/UserAuthTypes";
import { LawyerRegisterInputType } from "../../types/LawyerAuthType";

export const lawyerLogin = async (loginInput: UserLoginType) => {
    return axios.post(`${API_BASE_URL}/auth/lawyer/login`, loginInput);
}

export const lawyerSignUp = async (lawyerRegisterInput: LawyerRegisterInputType) => {
    return axios.post(`${API_BASE_URL}/auth/lawyer/signup`, lawyerRegisterInput);
}