import { createTheme } from "@mui/material/styles";
import { orange } from "@mui/material/colors";

// Define the theme with extensive customization
const appTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    secondary: {
      main: "#000",
    },
    status: {
      danger: orange[500],
    },
  },

  custom: {
    myOwnComponent: {
      margin: "10px 10px",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "gray",
          color: "white",
          "&:hover": {
            backgroundColor: "#ede7f6",
          },
        },
      },
    },
  },
});

export default appTheme;
