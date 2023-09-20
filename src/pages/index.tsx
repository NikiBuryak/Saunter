import { HomeTempl } from "../templates/pages/Home";
import { Typography } from "@mui/material";
import { useAppSelector } from "../hooks/redux";

export const Home = () => {
  const paths = useAppSelector((state) => state.pathsReducer.paths);
  return (
    <>
      <HomeTempl />
    </>
  );
};
