import React, { FC, ReactNode } from "react";
import { Row } from "antd";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  component: ReactNode;
  isAuthenticated: boolean;
}

const PrivateRoute: FC<PrivateRouteProps> = ({
  component,
  isAuthenticated,
}) => {
  return <Row>{isAuthenticated ? component : <Navigate to="/login" />}</Row>;
};

export default PrivateRoute;
