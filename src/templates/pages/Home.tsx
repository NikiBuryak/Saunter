import Grid from "@mui/material/Grid";
import { PathList } from "../../components/PathList";
import { PathCard } from "../../components/PathCard";
import { FC, useState } from "react";
import { AddPathDialog } from "../layout/AddPathDialog";
import { theme } from "../../theme";

export const HomeTempl: FC = () => {
  const [activePath, setActivePath] = useState<string | null>(null);

  return (
    <Grid container sx={mainGridStyles}>
      <Grid item xs={12} md={6} sx={firstGrid}>
        <PathList setActivePath={setActivePath} activePath={activePath} />
      </Grid>
      <Grid item xs={12} md={6} sx={lastGrid}>
        {activePath && (
          <PathCard
            key={activePath}
            id={activePath}
            setActivePath={setActivePath}
          />
        )}
      </Grid>
      <AddPathDialog />
    </Grid>
  );
};

const gridStyles = {
  padding: {
    xs: `0`,
    md: `0 ${theme.spacing(4)}`,
    lg: `0 ${theme.spacing(5)}`,
  },
  maxHeight: "500px",
  overflow: "auto",
};
const firstGrid = {
  ...gridStyles,
  borderRight: { xs: 0, md: "2px solid #7c7c7c" },

  paddingLeft: { md: 0 },
  paddingBottom: { xs: theme.spacing(2), md: 0 },
};
const lastGrid = {
  ...gridStyles,
  paddingRight: { md: 0 },
  paddingTop: { xs: theme.spacing(2), md: 0 },
  borderTop: { xs: "2px solid #7c7c7c", md: 0 },
};

const mainGridStyles = {
  paddingTop: "20px",
  overflow: "auto",
};
