import {
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
} from "@mui/material";
import GradeIcon from "@mui/icons-material/Grade";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { FC, useCallback, SetStateAction } from "react";
import { pathsApi } from "../services/PathService";
import { Arrows } from "../svg/arrows";
import { theme } from "../theme";
import { IPath } from "../models/IPath";

interface IProps {
  setActivePath: Function;
}

export const PathList = ({ setActivePath }: IProps) => {
  const { isLoading, data, error } = pathsApi.useGetPathsQuery("");
  console.log(data, "data");

  if (isLoading) {
    return <Typography variant="h3">Loading...</Typography>;
  }
  if (!data || data?.length < 1) {
    return <Typography>List empty...</Typography>;
  }

  const handleClick = (path: IPath): void => {
    setActivePath(path);
  };

  return (
    <List>
      {data?.map((path) => (
        <ListItem
          onClick={() => handleClick(path)}
          sx={listStyles}
          key={path.id}
          secondaryAction={
            <IconButton>
              <ArrowForwardIosIcon
                sx={{
                  width: "20px",
                  height: "20px",
                }}
              />
            </IconButton>
          }
        >
          <ListItemAvatar>
            <Arrows />
          </ListItemAvatar>
          <ListItemText
            sx={{
              flex: "none",
              flexGrow: 1,
              margin: 0,
            }}
            primary={
              <>
                {" "}
                <Typography variant="h6">
                  {!!path.isFavorite && (
                    <GradeIcon
                      sx={{
                        width: "15px",
                        height: "15px",
                        color: "#72badf",
                      }}
                    />
                  )}
                  {path.title}
                </Typography>
              </>
            }
            secondary={<>{path?.shortDescr}</>}
          />
          <Typography variant="h6">{path.distance} km</Typography>
        </ListItem>
      ))}
    </List>
  );
};

const listStyles = {
  background: "#f5f5f5",
  marginBottom: theme.spacing(2),
  paddingRight: "10px 50px 10px 15px",
  cursor: "pointer",
  alignItems: "center",
};
