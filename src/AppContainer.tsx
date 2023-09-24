import { Paper, ThemeProvider, Container } from "@mui/material";
import { Header } from "./templates/layout/Header";
import { theme } from "./theme";
import { Home } from "./pages";
import { setupStore } from "./store/store";
import { Provider } from "react-redux";

const store = setupStore();

export const AppContainer = () => {
  return (
    <>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Container sx={containerStyles}>
            <Paper variant="elevation" sx={paperStyles}>
              <Header />
              <Home />
            </Paper>
          </Container>
        </ThemeProvider>
      </Provider>
    </>
  );
};

const paperStyles = {
  margin: "0 auto",
  padding: "15px",
  maxWidth: "1000px",
  "@media (min-width:768px)": {
    padding: "25px",
  },
};
const containerStyles = {
  padding: "10px 0",
  "@media (min-width:768px)": {
    padding: "50px 0",
  },
};
