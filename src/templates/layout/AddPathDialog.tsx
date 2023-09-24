import { FC, useState } from "react";
import { Dialog, Typography, Box, IconButton, Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { pathSlice } from "../../store/reducers/UseSlice";
import CloseIcon from "@mui/icons-material/Close";
import { theme } from "../../theme";
import { Map } from "../../components/Map";
import { PathForm } from "../../components/PathForm";
import { IForm } from "../../models/IForm";
import { pathsApi } from "../../services/PathService";

export const AddPathDialog: FC = () => {
  const isDialogOpened = useAppSelector(
    (state) => state.pathsReducer.isDialogOpened
  );
  const [distance, setDistance] = useState<number>(0);
  const dispatch = useAppDispatch();
  const markers = useAppSelector((state) => state.pathsReducer.paths);
  const { closeDialog } = pathSlice.actions;
  const [addPath, { error: addPathError }] = pathsApi.useAddPathMutation();

  const handleDialogClose = () => {
    dispatch(closeDialog());
  };

  const handleSubmit = ({ fullDescr, shortDescr, title }: IForm) => {
    const newPath = {
      distance,
      fullDescr,
      title,
      shortDescr,
      paths: markers,
      isFavorite: 0,
    };

    addPath(newPath);

    if (addPathError) {
      console.error(addPathError);
      return <Typography>Opps something went wrong!</Typography>;
    }
    dispatch(closeDialog());
  };

  return (
    <Dialog
      open={isDialogOpened}
      onClose={handleDialogClose}
      fullWidth={true}
      sx={dialogStyles}
    >
      <Box sx={contentWrapperStyles}>
        <Box sx={headerWrapperStyles}>
          <Typography
            variant="body1"
            sx={{
              flexGrow: 1,
            }}
          >
            Add new path
          </Typography>
          <IconButton onClick={handleDialogClose}>
            <CloseIcon color="secondary" />
          </IconButton>
        </Box>
        <Grid container>
          <Grid item xs={12} md={6} sx={dialogColumnStyles}>
            <PathForm submitHandler={handleSubmit} distance={distance} />
          </Grid>
          <Grid item xs={12} md={6} sx={dialogColumnStyles}>
            <Map setDistance={setDistance} />
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
};

const dialogStyles = {
  padding: { xs: "10px 0", md: "50px 0" },
  display: "block",
  maxWidth: "1050px",
  minHeight: "550px",
  margin: "0 auto",
};
const contentWrapperStyles = {
  width: "100%",
  height: "100%",
  display: "block",
  maxWidth: "1050px",
  padding: 0,
};
const headerWrapperStyles = {
  padding: theme.spacing(2),
  borderBottom: "2px solid #7c7c7c",
  display: "flex",
  alignItems: "center",
};
const dialogColumnStyles = {
  padding: theme.spacing(3),
  height: "100%",
};
