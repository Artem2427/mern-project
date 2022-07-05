import React, { FC } from "react";
import Meta from "antd/lib/card/Meta";
import classNames from "classnames";
import { Card } from "antd";
import { useNavigate } from "react-router-dom";

import useStyles from "./style";

interface LinkCardProps {
  link: LinkDTO;
  loading: boolean;
  index: number;
  clazz: string;
}

const LinkCard: FC<LinkCardProps> = ({ link, loading, index, clazz }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleClickOnCard = () => {
    navigate(`/detail/${link._id}`);
  };

  return (
    <Card
      className={classNames(classes.root, clazz)}
      loading={loading}
      onClick={handleClickOnCard}
      cover={
        <div>
          <img
            alt="example"
            src="https://source.unsplash.com/random"
            className="card-img"
          />
        </div>
      }
    >
      <Meta
        title={`Link №${index}`}
        description={`Created: ${new Date(link.date).toLocaleDateString()}`}
      />
    </Card>
  );
};

export default LinkCard;
