  
import { createTheme } from "@mui/material";

declare module '@mui/material/styles' {
  interface TypeBackground {
    main: string;
  }
}

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1ed760",
    },
    secondary: {
      main: "#ffffff",
    },
    background: {
      default: "#000",
      paper: "#121212",
      main: "#1D1D1D"
    },
    text: {
      primary: "#fff",
      secondary: "#b3b3b3",
    },
    action: {
      hover: "#282828",
      active: "#333",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      fontWeight: 700,
      fontSize: "24px",
    },
    h2: {
      fontSize: "1rem",
    },
    body1: {
      fontSize: "14px",
    },
    subtitle1: {
      fontSize: "0.6875rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "30px",
          textTransform: "none",
        },
        sizeLarge: {
          padding: "8px 32px",
          fontWeight: 700,
          fontSize: "16px",
        },
      },
      variants: [
        {
          props: { variant: "contained", color: "secondary" },
          style: {
            backgroundColor: "#ffffff",
            color: "#000000",
            "&:hover": {
              backgroundColor: "#e0e0e0",
            },
          },
        },
      ],
    },
  },
});

export default theme;
  