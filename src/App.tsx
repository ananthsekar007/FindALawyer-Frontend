import { createBrowserRouter } from "react-router-dom";
import ClientLogin from "./pages/client/auth/Login";
import ClientSignUp from "./pages/client/auth/SignUp";
import ClientHome from "./pages/client/Home";

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
  }
]);

