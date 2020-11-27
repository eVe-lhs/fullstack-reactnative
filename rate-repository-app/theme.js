import { Platform } from "react-native";

const theme = {
  colors: {
    textPrimary: "#24292e",
    textSecondary: "grey",
    primary: "#0366d6",
    danger: "#e83225",
  },
  fontSizes: {
    body: 14,
    appbar: 18,
    subheading: 16,
  },
  fonts: {
    main: Platform.OS === "android" ? "Roboto" : "Arial",
  },
  fontWeights: {
    thin: "200",
    normal: "400",
    bold: "700",
  },
};

export default theme;
