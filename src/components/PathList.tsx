import {
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import GradeIcon from "@mui/icons-material/Grade";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { FC, useState } from "react";
import { pathsApi } from "../services/PathService";
import { Arrows } from "../svg/arrows";
import { theme } from "../theme";
import SearchIcon from "@mui/icons-material/Search";
import { IPath } from "../models/IPath";
import useWindowDimensions from "../hooks/dimensions";

interface IProps {
  setActivePath: Function;
  activePath: string | null;
}

interface IPathItem extends IPath {
  id: string;
}

export const PathList: FC<IProps> = ({ activePath, setActivePath }) => {
  const { isLoading, data, error } = pathsApi.useGetPathsQuery("");
  const [searchParam, serSearchParam] = useState<string>("");

  const { width, height } = useWindowDimensions();

  if (isLoading) {
    return <Typography variant="h4">Loading...</Typography>;
  }
  if (!data || data?.length < 1) {
    return <Typography>List empty...</Typography>;
  }

  if (error) {
    return <Typography variant="h4">Opps! Something gone wrong...</Typography>;
  }

  const handleClick = (id: string): void => {
    setActivePath(id);
  };

  let paths;
  if (searchParam.length > 0) {
    paths = data.filter(
      (el: IPathItem) =>
        el.title.toLowerCase().includes(searchParam.toLowerCase()) ||
        el.fullDescr?.toLowerCase().includes(searchParam.toLowerCase())
    );
  } else {
    paths = data;
  }

  return (
    <>
      <TextField
        value={searchParam}
        placeholder="Search"
        size="small"
        onChange={(ev) => serSearchParam(ev.target.value)}
        fullWidth
        sx={inputStyles}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" sx={{ pointerEvents: "none" }}>
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <List>
        {paths?.map((path: IPathItem) => (
          <ListItem
            onClick={() => handleClick(path.id)}
            className={activePath && activePath == path.id ? "active" : ""}
            sx={listStyles}
            key={path.id}
            secondaryAction={
              <IconButton>
                <ArrowForwardIosIcon sx={arrowForwardStyles} />
              </IconButton>
            }
          >
            <ListItemAvatar
              sx={{
                minWidth: "unset",
                marginRight: theme.spacing(2),
              }}
            >
              <Arrows />
            </ListItemAvatar>
            <ListItemText
              sx={listItemStyles}
              primary={
                <Typography variant="h6" sx={itemTitleStyles}>
                  {!!path.isFavorite && <GradeIcon sx={starIconStyles} />}
                  {path.title}
                </Typography>
              }
              secondary={
                <Typography variant="body1" sx={{ color: "inherit" }}>
                  {path?.shortDescr}
                </Typography>
              }
            />
            <Typography variant="h6">{path.distance} km</Typography>
          </ListItem>
        ))}
      </List>
    </>
  );
};

const listStyles = {
  background: "#f5f5f5",
  marginBottom: theme.spacing(2),
  padding: "10px 30px 10px 15px",
  cursor: "pointer",
  alignItems: "center",
  transition: ".5s ease",
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

const inputStyles = {
  marginBottom: theme.spacing(3),
};

const starIconStyles = {
  width: "20px",
  height: "20px",
  color: "#72badf",
};

const listItemStyles = {
  flex: "none",
  flexGrow: 1,
  margin: 0,
  color: "inherit",
};

const arrowForwardStyles = {
  width: "20px",
  height: "20px",
  color: "inherit",
};

const itemTitleStyles = { display: "flex", alignItems: "center" };
