import { Client } from "../types/Client";
import { Lawyer } from "../types/Lawyer";

const FindALawyerClient = "FindALawyerClient";
const FindALawyerLawyer = "FindALawyerLawyer";

const FindALawyerClientToken = "FindALawyerClientToken";
const FindALawyerLawyerToken = "FindALawyerLawyerToken";

export const setClient = (client : Client) => {
    localStorage.setItem(FindALawyerClient, JSON.stringify(client));
}

export const getClient = () : Client | null => {
    let user = localStorage.getItem(FindALawyerClient);
    if(!user) return null; 
    return JSON.parse(user);
}

export const setClientAuthToken = (token: string) => {
    localStorage.setItem(FindALawyerClientToken, token);
}

export const getClientAuthToken = (): string | null => {
    return localStorage.getItem(FindALawyerClientToken);
}

export const setLawyer = (lawyer : Lawyer) => {
    localStorage.setItem(FindALawyerLawyer, JSON.stringify(lawyer));
}

export const getLawyer = () : Lawyer | null => {
    let user = localStorage.getItem(FindALawyerLawyer);
    if(!user) return null; 
    return JSON.parse(user);
}

export const setLawyerAuthToken = (token: string) => {
    localStorage.setItem(FindALawyerLawyerToken, token);
}

export const getLawyerAuthToken = (): string | null => {
    return localStorage.getItem(FindALawyerLawyerToken);
}


export const clientLogout = () => {
    localStorage.removeItem(FindALawyerClient);
    localStorage.removeItem(FindALawyerClientToken);
}


export const lawyerLogout = () => {
    localStorage.removeItem(FindALawyerLawyer);
    localStorage.removeItem(FindALawyerLawyerToken);
}
