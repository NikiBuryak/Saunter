import { FC } from "react";
import {
  ListItemAvatar,
  ListItemText,
  IconButton,
  Typography,
  ListItem,
  Box,
} from "@mui/material";
import GradeIcon from "@mui/icons-material/Grade";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Arrows } from "../svg/arrows";
import { IPath } from "../models/IPath";
import { theme } from "../theme";

interface IPathItem extends IPath {
  id: string;
}

interface IProps {
  handleClick: Function;
  path: IPathItem;
  activePath: string | null;
}

export const PathListItem: FC<IProps> = ({ handleClick, path, activePath }) => {
  const distance =
    path.distance > 1 ? `${path.distance} km` : `${path.distance * 1000} m`;

  return (
    <ListItem
      onClick={() => handleClick(path.id)}
      className={activePath && activePath === path.id ? "active" : ""}
      sx={listStyles}
      key={path.id}
      secondaryAction={
        <IconButton>
          <ArrowForwardIosIcon sx={arrowForwardStyles} />
        </IconButton>
      }
    >
      <ListItemAvatar sx={listItemImgStyles}>
        <Arrows />
      </ListItemAvatar>
      <ListItemText
        sx={listItemStyles}
        primary={
          <Box sx={itemTitleWrapperStyles}>
            {!!path.isFavorite && <GradeIcon sx={starIconStyles} />}
            <Typography variant="h6" sx={itemTitleStyles}>
              {path.title}
            </Typography>
          </Box>
        }
        secondary={
          <Typography variant="body1" sx={listDescrStyles}>
            {path?.shortDescr}
          </Typography>
        }
      />
      <Typography variant="h6" sx={distanceStyles}>
        {distance}
      </Typography>
    </ListItem>
  );
};

const starIconStyles = {
  width: "20px",
  height: "20px",
  color: "#72badf",
};

const listItemImgStyles = {
  minWidth: "unset",
  marginRight: theme.spacing(2),
  width: "40px",
};

const listItemStyles = {
  flex: "none",
  flexGrow: 1,
  margin: 0,
  color: "inherit",
  maxWidth: "calc(75% - 50px)",
};

const arrowForwardStyles = {
  width: "20px",
  height: "20px",
  color: "inherit",
};

const itemTitleWrapperStyles = {
  display: "flex",
  alignItems: "center",
};
const itemTitleStyles = {
  display: "inline-block",
  textOverflow: "ellipsis",
  overflow: "hidden",
  whiteSpace: "nowrap",
  width: "calc(100% - 10px)",
  paddingLeft: "5px",
};

const listDescrStyles = {
  color: "inherit",
  display: " -webkit-box",
  overflow: "hidden",
  fontSize: "14px",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
};
const listStyles = {
  background: "#f5f5f5",
  marginBottom: theme.spacing(2),
  padding: "15px 30px 10px 15px",
  cursor: "pointer",
  alignItems: "center",
  borderRadius: "5px",
  transition: ".5s ease",
  color: "#7c7c7c",
  " svg": {
    transition: ".5s ease",
  },
  "&:hover,&.active": {
    backgroundColor: "#0088cc",
    color: "#ffffff",
  },
  "&:hover svg, &.active svg": {
    color: "#fff",
  },
};

const distanceStyles = {
  marginLeft: "10px",
  width: "25%",
  textAlign: "center",
};
