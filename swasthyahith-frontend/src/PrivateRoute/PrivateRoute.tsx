import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useSelector, UseSelector } from "react-redux";


function PrivateRoute({ children }: { children: ReactNode }) {

  const jwt = useSelector((state: any) => state.auth?.jwt);

  return jwt ? children : <Navigate to="/login" />;


}

export default PrivateRoute;