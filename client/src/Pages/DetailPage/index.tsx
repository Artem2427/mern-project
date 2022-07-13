import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Row, Typography } from "antd";

import linksService from "../../Services/linksService";

import Loader from "../../Components/Loader";

import loaderStyles from "../../Utils/Styles/loaderStyle";
import useStyles from "./style";
import axios from "axios";
import { TypeNotification } from "../../Utils/enums";
import { useMessage } from "../../Hooks/message.hook";
import { DataError } from "../AuthPage";
import { useHttp } from "../../Hooks/http.hook";

const { Title, Paragraph } = Typography;

const DetailPage = () => {
  const classes = useStyles();
  const spin = loaderStyles();
  const message = useMessage();
  const { loading } = useHttp();
  const [link, setLink] = useState<null | LinkDTO>(null);

  const linkId = useParams().id;

  const fetchLink = useCallback(async () => {
    try {
      const newLink = await linksService.getLinkById(linkId ?? "");

      // const newLink = await request(`/api/link/${linkId}`, Methods.get, null, {
      //   Authorization: `Bearer ${token}`,
      // });
      setLink(newLink);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const messageError = error.response.data as DataError;
        message(messageError.message, TypeNotification.erorr);
      }
    }
  }, [linkId, message]);

  useEffect(() => {
    fetchLink();
  }, [fetchLink]);

  return (
    <Row className={classes.root}>
      <Row className="container">
        {loading && <Loader clazz={spin.loader} />}
        {!loading && link && (
          <>
            <Title>Detail info</Title>
            <Paragraph>
              Your link:{" "}
              <a href={link.to} target="_blank" rel="noopener noreferrer">
                {link.to}
              </a>
            </Paragraph>
            <Paragraph>
              From:{" "}
              <a href={link.from} target="_blank" rel="noopener noreferrer">
                {link.from}
              </a>
            </Paragraph>
            <Paragraph>
              Amout of click on link: <strong>{link.clicks}</strong>
            </Paragraph>
            <Paragraph>
              Date create:{" "}
              <strong>{new Date(link.date).toLocaleDateString()}</strong>
            </Paragraph>
          </>
        )}
      </Row>
    </Row>
  );
};

export default DetailPage;
