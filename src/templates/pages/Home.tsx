import Grid from "@mui/material/Grid";
import { PathList } from "../../components/PathList";
import { PathCard } from "../../components/PathCard";
import { FC, useState } from "react";
import { AddPathDialog } from "../layout/AddPathDialog";
import { theme } from "../../theme";

export const HomeTempl: FC = () => {
  const [activePath, setActivePath] = useState<string | null>(null);

  return (
    <Grid container sx={mainGridStyles} gap={8}>
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

const firstGrid = {
  paddingBottom: { xs: theme.spacing(2), md: 0 },
  maxHeight: "500px",
  overflow: "auto",
};
const lastGrid = {
  paddingTop: { xs: theme.spacing(2), md: 0 },
  borderTop: { xs: "2px solid #7c7c7c", md: 0 },
  paddingRight: { xs: 0, md: "20px" },
  maxHeight: "500px",
  overflow: "auto",
};

const mainGridStyles = {
  paddingTop: "20px",
  overflow: "auto",
  flexWrap: { xs: "wrap", md: "nowrap" },
  position: "relative",
  "&:before": {
    content: '""',
    height: "calc(100% - 20px)",
    display: { xs: "none", md: "block" },
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    bottom: "0",
    width: "1.5px",
    backgroundColor: "#7c7c7c",
  },
};
