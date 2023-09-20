import { Typography, Card, CardContent } from "@mui/material";
import { FC } from "react";
import { PathMap } from "./PathMap";

export const PathCard: FC = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Card title</Typography>
        <Typography variant="body1">
          Card description Lorem ipsum dolor sit amet, consectetur adipisicing
          elit. Voluptates nihil optio itaque soluta molestiae aliquid ipsum nam
          pariatur exercitationem vel accusamus repudiandae quasi libero, alias
          explicabo quae totam amet autem! Ab omnis animi, adipisci hic, aliquid
          blanditiis eum a, recusandae esse perferendis porro nulla vero ratione
          laborum officia! Corporis, quae ratione. Voluptates obcaecati nihil
          illum incidunt aliquam fuga error impedit!
        </Typography>
        <PathMap />
      </CardContent>
    </Card>
  );
};
