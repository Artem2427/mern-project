import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  root: {
    margin: "0 auto",

    "& .title": {
      width: "100%",
      display: "flex",
      justifyContent: "center",
    },

    "& .links__wrapper": {
      display: "flex",
      gap: "30px",
      flexWrap: "wrap",
      width: "100%",
      cursor: "pointer",

      "& .card-link": {
        width: "calc((100% - 60px) / 3)",
      },
    },
  },
});

export default useStyles;
