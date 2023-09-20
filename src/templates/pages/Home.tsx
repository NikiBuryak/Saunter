import Grid from "@mui/material/Grid";
import { PathList } from "../../components/PathList";
import { PathCard } from "../../components/PathCard";
import { FC } from "react";

export const HomeTempl: FC = () => {
  return (
    <Grid
      container
      sx={{
        paddingTop: "20px",
      }}
    >
      <Grid item xs={12} md={6}>
        <PathList />
      </Grid>
      <Grid item xs={12} md={6}>
        <PathCard />
      </Grid>
    </Grid>
  );
};
