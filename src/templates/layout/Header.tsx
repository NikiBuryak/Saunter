import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { Arrows } from "../../svg/arrows";
import { JsxElement } from "typescript";
import { FC } from "react";
import { ThemeProvider, useTheme } from "@emotion/react";
import { theme } from "../../theme";

export const Header: FC = () => {
  return (
    <AppBar component="nav" color="transparent" position="static" elevation={0}>
      <Toolbar
        disableGutters={true}
        variant="dense"
        sx={{
          padding: `0 0 ${theme.spacing(4)}`,
          borderBottom: "2px solid #7c7c7c",
        }}
      >
        <Arrows />
        <Typography
          variant="h4"
          component="div"
          sx={{
            padding: `0 ${theme.spacing(3)}`,
            display: "block",
            flexGrow: 1,
          }}
        >
          Saunter
        </Typography>
        <Box>
          <Button
            variant="contained"
            sx={{
              fontWeight: "600",
            }}
          >
            Add Path
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
