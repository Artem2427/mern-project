import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  root: {
    margin: "0 auto",

    "& .ant-form": {
      width: "100%",
    },
  },

  title: {
    textAlign: "center",
  },
});

export default useStyles;
