import React, { useEffect, useState } from "react";
import { Row } from "antd";
import LinkCard from "../../Components/LinkCard";
import Loader from "../../Components/Loader";
import linksService from "../../Services/linksService";

import loaderStyles from "../../Utils/Styles/loaderStyle";
import useStyles from "./style";

const LinksPage = () => {
  const classes = useStyles();
  const spin = loaderStyles();
  const [links, setLinks] = useState<null | LinkDTO[]>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchLinks = async () => {
    try {
      const response = await linksService.fetchAllLinks();

      setLinks(response);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  if (loading) {
    return <Loader clazz={spin.loader} />;
  }

  return (
    <Row className={classes.root}>
      {links && links.length > 0 ? (
        <Row className="container">
          <h1 className="title">{`Amount of links - (${links.length})`}</h1>
          <div className="links__wrapper">
            {links.map((link, index) => {
              return (
                <LinkCard
                  index={index + 1}
                  link={link}
                  key={link._id}
                  loading={loading}
                  clazz="card-link"
                />
              );
            })}
          </div>
        </Row>
      ) : (
        "Links have not been created"
      )}
    </Row>
  );
};

export default LinksPage;
