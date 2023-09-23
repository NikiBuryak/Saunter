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
  const { isDialogOpened } = useAppSelector((state) => state.pathsReducer);
  const [distance, setDistance] = useState<number>(0);
  const dispatch = useAppDispatch();
  const markers = useAppSelector((state) => state.pathsReducer.paths);
  const { closeDialog } = pathSlice.actions;
  const [addPath, { isLoading, error }] = pathsApi.useAddPathMutation();

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
    dispatch(closeDialog());
    addPath(newPath);
  };

  return (
    <Dialog
      open={isDialogOpened}
      onClose={handleDialogClose}
      fullWidth={true}
      sx={{
        padding: "10px 0",
        display: "block",
        maxWidth: "850px",
        minHeight: "550px",
        margin: "0 auto",

        "@media (min-width:768px)": {
          padding: "50px 0",
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "block",
          maxWidth: "800px",
          padding: 0,
        }}
      >
        <Box
          sx={{
            padding: theme.spacing(2),
            borderBottom: "2px solid #7c7c7c",
            display: "flex",
            alignItems: "center",
          }}
        >
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
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              padding: theme.spacing(3),
            }}
          >
            <PathForm submitHandler={handleSubmit} distance={distance} />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              padding: theme.spacing(3),
            }}
          >
            <Map setDistance={setDistance} />
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
};
