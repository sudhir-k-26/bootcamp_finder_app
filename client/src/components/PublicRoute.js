import React from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../contexts/auth/AuthState"
import Spinner from './Spinner';

const PublicRoute = ({ component: Component, ...props }) => {
  const [authState] = useAuth();
  
  
  const { isAuthenticated, loading } = authState;
  if (loading) return <Spinner />;
  else if (isAuthenticated===false) return <Component {...props} />;
  else if(isAuthenticated) return  <Navigate to={'/bootcamps'} />
};

export default PublicRoute;