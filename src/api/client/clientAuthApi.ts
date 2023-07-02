import axios from "axios";
import { UserLoginType } from "../../types/UserAuthTypes";
import { API_BASE_URL } from "../../constants/AppConstants";
import { ClientRegisterInputType } from "../../types/ClientAuthType";

export const clientLogin = async (loginInput: UserLoginType) => {
    return axios.post(`${API_BASE_URL}/auth/client/login`, loginInput);
}

export const clientSignUp = async (clientRegisterInput: ClientRegisterInputType) => {
    return axios.post(`${API_BASE_URL}/auth/client/signup`, clientRegisterInput);
}