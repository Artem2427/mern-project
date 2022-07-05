import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  root: {
    "& .container": {
      width: "1320px",
      margin: "0 auto",

      "@media screen and (max-width: 1400px)": {
        width: "1140px",
      },
    },
  },
});

export default useStyles;
