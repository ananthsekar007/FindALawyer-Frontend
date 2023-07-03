import { createBrowserRouter } from "react-router-dom";
import ClientLogin from "./pages/client/auth/Login";
import ClientSignUp from "./pages/client/auth/SignUp";
import ClientHome from "./pages/client/Home";
import LawyerLogin from "./pages/lawyer/auth/Login";
import LawyerSignUp from "./pages/lawyer/auth/SignUp";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ClientHome />
  },
  {
    path: "/client/login",
    element: <ClientLogin />,
  },
  {
    path: "/client/signup",
    element: <ClientSignUp />
  },
  {
    path: "/lawyer/login",
    element: <LawyerLogin />,
  },
  {
    path: "/lawyer/signup",
    element: <LawyerSignUp />
  }
]);

