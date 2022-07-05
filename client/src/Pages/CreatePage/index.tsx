import React, { useState } from "react";
import { Button, Col, Form, Input, Row, Typography } from "antd";
import { useForm } from "antd/lib/form/Form";

import useStyles from "./style";
import linksService from "../../Services/linksService";
import { useNavigate } from "react-router-dom";

const CreatePage = () => {
  const classes = useStyles();
  const [form] = useForm();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);

  const handleCreateNewLink = async (values: LinkBody) => {
    setLoading(true);
    try {
      const { link } = await linksService.createLink({ from: values.link });

      console.log(link, "link");

      form.setFieldsValue({ link: "" });
      navigate(`/detail/${link._id}`);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row className={classes.root}>
      <Row className="container">
        <Form
          form={form}
          initialValues={{ link: "" }}
          onFinish={handleCreateNewLink}
        >
          <Typography.Title italic={true} className={classes.title}>
            Create new link
          </Typography.Title>
          <Row gutter={[24, 0]} justify="center">
            <Col span={8}>
              <Form.Item
                label="Link"
                name="link"
                rules={[
                  {
                    required: true,
                    validator: async (_, value) => {
                      if (value.length > 8) {
                        return Promise.resolve();
                      }

                      return Promise.reject(new Error("Incorrect link"));
                    },
                  },
                ]}
              >
                <Input
                  placeholder="Enter your link"
                  data-id="link"
                  autoComplete="false"
                />
              </Form.Item>
            </Col>
            <Col>
              <Button type="primary" htmlType="submit" disabled={loading}>
                Create link
              </Button>
            </Col>
          </Row>
        </Form>
      </Row>
    </Row>
  );
};

export default CreatePage;
