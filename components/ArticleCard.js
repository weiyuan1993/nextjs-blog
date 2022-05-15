import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import Date from "./date";

export default function ArticleCard({
  author,
  publishedAt,
  title,
  description,
  url,
  urlToImage,
}) {
  return (
    <Card sx={{ maxWidth: "100%" }}>
      <CardHeader
        title={
          <CardActionArea href={url} target="_blank">
            {title}
          </CardActionArea>
        }
        subheader={
          <>
            {author} - <Date dateString={publishedAt} />
          </>
        }
      />
      <CardActionArea
        href={url}
        target="_blank"
        sx={{
          display: "flex",
          "@media screen and (max-width: 990px)": {
            flexWrap: "wrap",
          },
        }}
      >
        {urlToImage && (
          <CardMedia
            component="img"
            height="150"
            image={urlToImage}
            alt={title}
          />
        )}
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
