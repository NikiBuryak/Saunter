import { createTheme } from "@mui/material";

declare module "@mui/material" {
  interface TypographyVariants {
    error: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    error?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    error: true;
  }
}

export const theme = createTheme({
  typography: {
    error: {
      fontWeight: 400,
      lineHeight: 1.5,
      fontSize: "1rem",
    },
  },
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
          width: "100%",
          "@media (min-width:600px)": {
            width: "calc(100% - 64px)",
            border: "3px solid #7c7c7c",
            borderRadius: "5px",
          },
        },
        container: {
          alignItems: "flex-start",
          padding: 10,

          "@media (min-width:600px)": {
            alignItems: "center",
            padding: 0,
          },
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
    MuiListItemSecondaryAction: {
      styleOverrides: {
        root: {
          right: 0,
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
