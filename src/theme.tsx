import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
        outlined: {
          color: "#7c7c7c",
          borderColor: "#7c7c7c",
          backgroundColor: "#ffffff",
          fontWeight: 400,
          ":hover": {
            backgroundColor: "#7c7c7c",
            color: "#ffffff",
            borderColor: "#7c7c7c",
          },
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
    MuiDialog: {
      styleOverrides: {
        paper: {
          maxWidth: "unset",
          margin: 0,
          border: "3px solid #7c7c7c",
          borderRadius: "5px",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        elevation: {
          margin: 0,
          height: "auto",
        },
      },
    },
  },
  palette: {
    secondary: {
      main: "#7c7c7c",
    },
    primary: {
      main: "#7c7c7c",
    },
  },
  spacing: 5,
});
