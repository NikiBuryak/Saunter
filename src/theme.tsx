import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          color: "#7c7c7c",
          padding: 20,
          minHeight: "unset",
        },
      },
    },
  },
  spacing: 5,
});
