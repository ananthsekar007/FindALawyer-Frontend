import { createBrowserRouter } from "react-router-dom";
import ClientLogin from "./pages/client/auth/Login";
import ClientSignUp from "./pages/client/auth/SignUp";

export const router = createBrowserRouter([
  {
    path: "/client/login",
    element: <ClientLogin />,
  },
  {
    path: "/client/signup",
    element: <ClientSignUp />
  }
]);

