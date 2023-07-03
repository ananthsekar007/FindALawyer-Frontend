import { getLawyerAuthToken } from "../constants/LocalStorage";
import { useState, useLayoutEffect } from "react";

interface Props {
  children: JSX.Element;
}

const PrivateLawyerRoute: React.FC<Props> = ({ children }) => {
  const [authToken, setAuthToken] = useState<string | null>(null);

  useLayoutEffect(() => {
    const token = getLawyerAuthToken();
    setAuthToken(token);
  }, []);

  return authToken ? children : <h1>No authorized</h1>;
};

export default PrivateLawyerRoute;
