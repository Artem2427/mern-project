import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  root: {
    margin: "0 auto",
    height: "calc(100vh - 84px)",

    "& .container": {
      flexDirection: "column",
    },
  },
});

export default useStyles;
