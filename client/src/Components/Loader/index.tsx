import { Spin } from "antd";
import React, { FC } from "react";

interface LoaderProps {
  clazz?: string;
}

const Loader: FC<LoaderProps> = ({ clazz }) => {
  return <Spin size="large" className={clazz} />;
};

export default Loader;
