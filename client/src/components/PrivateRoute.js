import React from "react"
import  Spinner  from "./Spinner";
import { Navigate} from "react-router-dom"
import { useAuth } from "../contexts/auth/AuthState"


const PrivateRoute = ({ component: Component, ...props }) => {
  const [authState] = useAuth();
  const { isAuthenticated, loading } = authState;
  if (loading) return <Spinner />;
  if (isAuthenticated) return <Component  {...props} />;
  return <Navigate to='/login' />;
};
export default PrivateRoute;