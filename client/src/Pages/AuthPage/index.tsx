import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Button, Col, Form, Input, Row, Typography } from "antd";
import { useNavigate } from "react-router-dom";

import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

import { AuthContext } from "../../Context/AuthContext";
import authServices from "../../Services/authService";
import { TypeNotification } from "../../Utils/enums";

import { useMessage } from "../../Hooks/message.hook";

import useStyles from "./style";

const { Title } = Typography;

export interface DataError {
  message: string;
}

const AuthPage = () => {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const message = useMessage();

  const [isRegistration, setIsRegistration] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChooseAction = (isRegistration: boolean) => {
    setIsRegistration(isRegistration);
  };

  const handleFinish = async (values: LoginIfno) => {
    setIsLoading(true);
    try {
      if (isRegistration) {
        const response = await authServices.registrationNewUser({
          ...values,
        });

        message(response.message, TypeNotification.success);
        form.resetFields();
      } else {
        const response = await authServices.checkUser({ ...values });

        auth.login(response.token, response.userId);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const messageError = error.response.data as DataError;
        message(messageError.message, TypeNotification.erorr);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/");
    }
  }, [auth.isAuthenticated, navigate]);

  return (
    <Form
      className={classes.root}
      form={form}
      initialValues={{ email: "", password: "" }}
      onFinish={handleFinish}
    >
      <Title level={2}>Авторизация</Title>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            validator: async (_, value) => {
              if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return Promise.resolve();
              }

              return Promise.reject(new Error("Не коректный email"));
            },
          },
        ]}
      >
        <Input
          placeholder="Введите ваш email"
          data-id="email"
          autoComplete="false"
        />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            validator: async (_, value) => {
              if (value.length > 5) {
                return Promise.resolve();
              }

              return Promise.reject(new Error("Минимум 6 символов"));
            },
          },
        ]}
      >
        <Input.Password
          data-id="password"
          autoComplete="false"
          placeholder="Введите ваш пароль"
          iconRender={(visible) =>
            visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
          }
        />
      </Form.Item>
      <Row gutter={[16, 0]}>
        <Col>
          <Button
            htmlType="submit"
            disabled={isLoading}
            onClick={() => handleChooseAction(false)}
          >
            ВОЙТИ
          </Button>
        </Col>
        <Col>
          <Button
            htmlType="submit"
            type="primary"
            disabled={isLoading}
            onClick={() => handleChooseAction(true)}
          >
            РЕГЕСТРАЦИЯ
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AuthPage;
