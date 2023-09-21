import { Typography } from "@mui/material";
import { FC } from "react";

import { IMap, IPosition } from "../models/IPosition";
import { Map } from "./Map";

const positions: google.maps.LatLngLiteral[] = [
  // { lat: 48.43648044523034, lng: 35.00278695361484 },
  // { lat: 48.6, lng: 35.5 },
];
export const PathMap: FC = () => {
  return (
    <>
      <Typography variant="h6"> Map</Typography>
      <Map markers={positions} />
    </>
  );
};
