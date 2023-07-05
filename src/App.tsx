import { createBrowserRouter } from "react-router-dom";
import ClientLogin from "./pages/client/auth/Login";
import ClientSignUp from "./pages/client/auth/SignUp";
import ClientHome from "./pages/client/Home";
import LawyerLogin from "./pages/lawyer/auth/Login";
import LawyerSignUp from "./pages/lawyer/auth/SignUp";
import Landing from "./pages/Landing";
import PrivateClientRoute from "./components/PrivateClientRoute";
import PrivateLawyerRoute from "./components/PrivateLawyerRoute";
import LawyerHome from "./pages/lawyer/Home";
import ClientLawyersPage from "./pages/client/Lawyers";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/client/login",
    element: <ClientLogin />,
  },
  {
    path: "/client/signup",
    element: <ClientSignUp />,
  },
  {
    path: "/lawyer/login",
    element: <LawyerLogin />,
  },
  {
    path: "/lawyer/signup",
    element: <LawyerSignUp />,
  },
  {
    path: "/client/home",
    element: (
      <PrivateClientRoute>
        <ClientHome />
      </PrivateClientRoute>
    ),
  },
  {
    path: "/lawyer/home",
    element: (
      <PrivateLawyerRoute>
        <LawyerHome />
      </PrivateLawyerRoute>
    ),
  },
  {
    path: "/client/lawyers",
    element: (
      <PrivateClientRoute>
        <ClientLawyersPage />
      </PrivateClientRoute>
    ),
  },
]);
