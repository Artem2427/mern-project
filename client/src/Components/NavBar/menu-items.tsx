import React from "react";
import { MenuProps } from "antd";
import { Link, NavigateFunction } from "react-router-dom";
import {
  AppstoreAddOutlined,
  HomeOutlined,
  LinkOutlined,
  LoginOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import authServices from "../../Services/authService";

const items = (
  isAuthenticated: boolean,
  logout: () => void,
  navigate: NavigateFunction
): MenuProps["items"] => {
  const handleLogout = async () => {
    if (isAuthenticated) {
      try {
        await authServices.logout();
        logout();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return [
    {
      label: <Link to="/">Home</Link>,
      key: "home",
      icon: <HomeOutlined />,
    },

    {
      label: <Link to="/links">All links</Link>,
      key: "links",
      icon: <LinkOutlined />,
    },
    {
      label: <Link to="/create-link">Create link</Link>,
      key: "create-link",
      icon: <AppstoreAddOutlined />,
    },

    {
      label: (
        <Link to="/login" onClick={handleLogout}>
          {isAuthenticated ? "Logout" : "Login"}
        </Link>
      ),
      key: "login",
      icon: isAuthenticated ? <LogoutOutlined /> : <LoginOutlined />,
    },
  ];
};

export default items;
