import React, { useContext, useEffect } from "react";
import { Row } from "antd";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../Context/AuthContext";

import useStyles from "./style";

const HomePage = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const auth = useContext(AuthContext);

  useEffect(() => {
    if (!auth.isAuthenticated && !localStorage.getItem("userData")) {
      navigate("/login");
    }
  }, [auth.isAuthenticated, navigate]);

  return (
    <Row className={classes.root}>
      <Row className="container">
        <div> My first MERN aplication</div>
      </Row>
    </Row>
  );
};

export default HomePage;
