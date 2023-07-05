import { Feedback } from "./Feedbacks";

export type Lawyer = {
  lawyerId: number;
  name: string;
  emailAddress: string;
  phoneNumber: string;
  qualification: string;
  type: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
};

export type LawyerWithRating = {
  lawyerId: number;
  name: string;
  emailAddress: string;
  phoneNumber: string;
  qualification: string;
  type: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
  averageRating: number;
  feedbacks: Feedback[];
};
