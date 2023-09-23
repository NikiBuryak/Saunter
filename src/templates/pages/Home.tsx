import Grid from "@mui/material/Grid";
import { PathList } from "../../components/PathList";
import { PathCard } from "../../components/PathCard";
import { FC, useState } from "react";
import { AddPathDialog } from "../layout/AddPathDialog";
import { theme } from "../../theme";
import { useAppSelector } from "../../hooks/redux";
import { IPath } from "../../models/IPath";

export const HomeTempl: FC = () => {
  const [activePath, setActivePath] = useState<IPath | null>(null);

  return (
    <Grid
      container
      sx={{
        paddingTop: "20px",
        maxHeight: "500px",
        overflow: "auto",
      }}
    >
      <Grid item xs={12} md={6} sx={gridStyles}>
        <PathList setActivePath={setActivePath} />
      </Grid>
      <Grid item xs={12} md={6} sx={gridStyles}>
        {activePath && (
          <PathCard id={activePath.id} setActivePath={setActivePath} />
        )}
      </Grid>
      <AddPathDialog />
    </Grid>
  );
};

const gridStyles = {
  padding: theme.spacing(3),
};
