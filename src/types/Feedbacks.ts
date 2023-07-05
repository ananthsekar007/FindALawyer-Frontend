import { Client } from "./Client";
import { Lawyer } from "./Lawyer";

export type Feedback = {
  feedbackId: number;
  lawyerId: number;
  clientId: number;
  rating: number;
  remarks: string;
  createdAt: Date;
  updatedAt: Date;
  client: Client;
  lawyer: Lawyer
};
