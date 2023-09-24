import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { Arrows } from "../../svg/arrows";
import { FC } from "react";
import { theme } from "../../theme";
import { useAppDispatch } from "../../hooks/redux";
import { pathSlice } from "../../store/reducers/UseSlice";

export const Header: FC = () => {
  const { openDialog } = pathSlice.actions;
  const dispatch = useAppDispatch();
  const handleBtnClick = () => {
    dispatch(openDialog());
  };

  return (
    <AppBar component="nav" color="transparent" position="static" elevation={0}>
      <Toolbar disableGutters={true} variant="dense" sx={logoStyles}>
        <Arrows />
        <Typography variant="h4" component="div" sx={titleStyles}>
          Saunter
        </Typography>
        <Box>
          <Button
            onClick={handleBtnClick}
            variant="contained"
            sx={addButtonStyles}
          >
            Add Path
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

const addButtonStyles = {
  fontWeight: "600",
  backgroundColor: "#0088cc",
  border: "1px solid #0088cc",
  color: "#fff",
  "&:hover": {
    color: "#0088cc",
    backgroundColor: "#ffffff",
    borderColor: "#0088cc",
  },
};

const titleStyles = {
  padding: `0 ${theme.spacing(3)}`,
  display: "block",
  flexGrow: 1,
};

const logoStyles = {
  padding: `0 0 ${theme.spacing(4)}`,
  borderBottom: "2px solid #7c7c7c",
};
