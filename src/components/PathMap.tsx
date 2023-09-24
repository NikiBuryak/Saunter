import { Typography } from "@mui/material";
import { FC } from "react";

import { IMap, IPosition } from "../models/IPosition";
import { Map } from "./Map";
import { useAppSelector } from "../hooks/redux";

interface IProps {
  markers: IPosition[];
}

export const PathMap: FC<IProps> = ({ markers }) => {
  return (
    <>
      <Map markers={markers} />
    </>
  );
};
