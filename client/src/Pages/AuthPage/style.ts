import { createUseStyles } from "react-jss";
import { PALITRA } from "../../Utils/common";

const useStyles = createUseStyles({
  root: {
    maxWidth: "640px",
    width: "100%",
    position: "absolute",
    top: "50%",
    left: "50%",
    textAlign: "center",
    transform: "translate(-50%, -50%)",
    backgroundColor: PALITRA.formBackground,
    borderRadius: "8px",
    padding: "40px 40px",
  },
});

export default useStyles;
