import { useLocalState } from "@/util/useLocalStorage";
import { Navigate } from "react-router-dom";

import { ReactNode } from "react";

function PrivateRoute({ children }: { children: ReactNode }) {

  const [jwt, jwtSet] = useLocalState("", "jwt");

  return jwt ? children : <Navigate to="/login" />;


}

export default PrivateRoute;