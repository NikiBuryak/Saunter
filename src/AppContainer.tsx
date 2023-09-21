import { Paper, ThemeProvider, Container } from "@mui/material";
import { Header } from "./templates/layout/Header";
import { theme } from "./theme";
import { Home } from "./pages";
import { setupStore } from "./store/store";
import { Provider } from "react-redux";
import { AddPathDialog } from "./templates/layout/AddPathDialog";

const store = setupStore();

export const AppContainer = () => {
  return (
    <>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Container
            sx={{
              padding: "10px 0",
              "@media (min-width:768px)": {
                padding: "50px 0",
              },
            }}
          >
            <Paper
              variant="elevation"
              sx={{
                margin: "0 auto",
                padding: "15px",
                maxWidth: "800px",
                "@media (min-width:768px)": {
                  padding: "25px",
                },
              }}
            >
              <Header />
              <Home />
            </Paper>
          </Container>
        </ThemeProvider>
      </Provider>
    </>
  );
};
