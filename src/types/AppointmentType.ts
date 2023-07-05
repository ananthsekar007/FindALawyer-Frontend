import { Client } from "./Client";
import { Lawyer } from "./Lawyer";

export type Appointment = {
  appointmentId: number;
  clientId: number;
  lawyerId: number;
  status: string;
  caseDescription: string;
  createdAt: Date;
  updatedAt: Date;
  lawyer: Lawyer;
  client: Client;
};
