import { createTheme } from "@mui/material/styles";
import { green, red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    success: {
      main: green[600],
    }
  },
});

export default theme;
