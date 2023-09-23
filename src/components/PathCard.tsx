import { Typography, Card, CardContent, Box } from "@mui/material";
import { FC, useCallback, useEffect } from "react";
import { PathMap } from "./PathMap";
import { useAppSelector } from "../hooks/redux";
import { IPath } from "../models/IPath";
import { theme } from "../theme";
import { pathsApi } from "../services/PathService";

interface IProps {
  id: string;
  setActivePath: Function;
}

export const PathCard = ({ id, setActivePath }: IProps) => {
  const { isLoading, data, error } = pathsApi.useGetPathsQuery("");

  if (isLoading) {
    return <Typography variant="body1">Loading...</Typography>;
  }

  const current = data && data.find((e) => e.id === id);

  if (!current) {
    return <Typography>Something gone wrong</Typography>;
  }

  const { isFavorite, distance, title, shortDescr, fullDescr, paths } = current;

  const [changeFavorite, { isLoading: isLoadingChange, error: changeError }] =
    pathsApi.useChangeFavoriteMutation();

  const [deletePath, { isLoading: isLoadingError, error: deleteError }] =
    pathsApi.useDeletePathMutation();
  const handleAddFavClick = () => {
    const data = { isFavorite, id };
    changeFavorite(data);
  };
  const handleRemoveClick = () => {
    setActivePath(null);
    deletePath(id);
  };

  return (
    <Card>
      <CardContent>
        <Box sx={cardHeadingStyles}>
          <Typography variant="h5">{title}</Typography>
          <Typography variant="body1">{distance} km</Typography>
        </Box>
        <Typography variant="body1">{fullDescr}</Typography>
        <PathMap markers={paths} />
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
