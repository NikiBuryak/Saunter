import { Typography, List, InputAdornment, TextField } from "@mui/material";

import { FC, useState } from "react";
import { pathsApi } from "../services/PathService";
import { theme } from "../theme";
import SearchIcon from "@mui/icons-material/Search";
import { IPath } from "../models/IPath";
import { PathListItem } from "./PathListItem";

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

  let paths: IPathItem[];
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
          <PathListItem
            key={path.id}
            handleClick={handleClick}
            path={path}
            activePath={activePath}
          />
        ))}
      </List>
    </>
  );
};

const inputStyles = {
  marginBottom: theme.spacing(3),
};
