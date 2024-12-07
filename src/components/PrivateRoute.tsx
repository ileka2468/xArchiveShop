import React from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../Security/user/UserContext";

interface PrivateRouteProps {
  children: React.ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const { isUser } = useUserContext();

  if (!isUser) {
    // if not authenticated redirect to landing
    return <Navigate to="/" replace />;
  }

  // if authenticated render the components
  return <>{children}</>;
}
