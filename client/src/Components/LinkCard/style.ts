import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  root: {
    "& .card-img": {
      width: "inherit",
      height: "160px",
      objectFit: "cover",
    },
  },
});

export default useStyles;
