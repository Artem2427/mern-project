import React, { FC, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, MenuProps, PageHeader, Row } from "antd";

import { AuthContext } from "../../Context/AuthContext";
import { NavTabs } from "../../Utils/enums";

import items from "./menu-items";

import useStyles from "./style";

const NavBar: FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout } = useContext(AuthContext);

  const [currentTab, setCurrentTab] = useState<NavTabs>(NavTabs.home);

  const handleChangeTab: MenuProps["onClick"] = (event) => {
    setCurrentTab(event.key as NavTabs);
  };

  useEffect(() => {
    const pathName = location.pathname.split("/");

    switch (pathName[1]) {
      case "":
        setCurrentTab(NavTabs.home);
        break;
      case NavTabs.createLink:
        setCurrentTab(NavTabs.createLink);
        break;
      case NavTabs.links:
        setCurrentTab(NavTabs.links);
        break;
      default:
        break;
    }
  }, [location]);

  return (
    <Row className={classes.root}>
      <Row className="container">
        <PageHeader
          title="Link Shorting"
          extra={
            <Menu
              items={items(isAuthenticated, logout, navigate)}
              mode="horizontal"
              selectedKeys={[currentTab]}
              onClick={handleChangeTab}
              style={{ minWidth: 500 }}
            />
          }
        />
      </Row>
    </Row>
  );
};

export default NavBar;
