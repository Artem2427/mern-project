import { createUseStyles } from "react-jss";
import { PALITRA } from "../../Utils/common";

const useStyles = createUseStyles({
  root: {
    backgroundColor: PALITRA.headerBackground,
    marginBottom: "24px",

    "& .ant-page-header": {
      padding: "0",
      width: "100%",

      "& .ant-page-header-heading-title": {
        fontSize: "32px",
        lineHeight: "1.5",
      },
    },

    "& .ant-menu-overflow": {
      backgroundColor: PALITRA.headerBackground,
      width: "100%",
      justifyContent: "center",
      borderBottom: "0",

      "& .ant-menu-overflow-item": {
        "& .anticon": {
          fontSize: "16px",
        },

        "& .ant-menu-title-content": {
          fontSize: "16px",
          fontWeight: "500",
        },
      },
    },
  },
});

export default useStyles;
