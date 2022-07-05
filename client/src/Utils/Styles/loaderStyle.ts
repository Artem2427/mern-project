import { createUseStyles } from "react-jss";

const loaderStyles = createUseStyles({
  loader: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
});

export default loaderStyles;
