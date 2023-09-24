import { Typography, Card, CardContent, Box } from "@mui/material";
import { PathMap } from "./PathMap";
import { theme } from "../theme";
import { pathsApi } from "../services/PathService";
import { IPath } from "../models/IPath";
import { useState, useEffect } from "react";

interface IProps {
  id: string;
  setActivePath: Function;
}

export const PathCard = ({ id, setActivePath }: IProps) => {
  const {
    data: currentData,
    isLoading,
    error,
  } = pathsApi.useGetSinglePathQuery(id);

  const [changeFavorite, { isLoading: isLoadingChange, error: changeError }] =
    pathsApi.useChangeFavoriteMutation();

  const [deletePath, { isLoading: isLoadingError, error: deleteError }] =
    pathsApi.useDeletePathMutation();

  if (!currentData && isLoading) {
    <Box sx={errorBoxStyles}>
      <Typography variant="body1">Loading.1..</Typography>;
    </Box>;
  }
  if (isLoading || isLoadingChange || isLoadingError) {
    <Box sx={errorBoxStyles}>
      <Typography variant="body1">Loading...</Typography>;
    </Box>;
  }

  if (error) {
    return (
      <Box sx={{ background: "red" }}>
        <Typography>Oops! Someting gone wrong. Try again later...</Typography>
      </Box>
    );
  }
  if (!currentData) {
    return (
      <Box sx={errorBoxStyles}>
        <Typography>Oops! Someting gone wrong. Try again later...</Typography>
      </Box>
    );
  }

  const { isFavorite, distance, title, fullDescr, paths } = currentData;

  const handleAddFavClick = () => {
    const data = { isFavorite, id };
    changeFavorite(data);
  };
  const handleRemoveClick = () => {
    setActivePath(null);
    deletePath(id);
  };

  if (changeError || deleteError) {
    const error = changeError || deleteError;
    console.error(error);

    return (
      <Box sx={errorBoxStyles}>
        <Typography variant="body1">
          Something gone wrong, try again later
        </Typography>
      </Box>
    );
  }
  const markers = [...paths];

  return (
    <Card sx={{ boxShadow: "none" }}>
      <CardContent sx={{ padding: 0 }}>
        <Box sx={cardHeadingStyles}>
          <Typography variant="h5">{title}</Typography>
          <Typography variant="h6">{distance} km</Typography>
        </Box>
        <Typography variant="body1">{fullDescr}</Typography>
        <PathMap markers={markers} />
        <Box sx={pathActionsStyles}>
          <Typography
            variant="body1"
            sx={pathAddFavoriteStyles}
            onClick={handleAddFavClick}
          >
            {!isFavorite ? "Add to favorites" : "Remove from favorites"}
          </Typography>
          <Typography
            variant="body1"
            sx={pathRemoveStyles}
            onClick={handleRemoveClick}
          >
            Remove
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

const pathActionsStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  paddingTop: theme.spacing(2),
};

const pathActivitiesStyles = {
  textDecoration: "underline",
  cursor: "pointer",
};

const pathAddFavoriteStyles = {
  ...pathActivitiesStyles,
  color: "#72badf",
};

const pathRemoveStyles = {
  ...pathActivitiesStyles,
  color: "#b73b3b",
};

const cardHeadingStyles = {
  display: "flex",
  justifyContent: "space-between",
};

const errorBoxStyles = {
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
