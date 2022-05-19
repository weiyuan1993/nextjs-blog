import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import Date from "../date";

export default function ArticleCard({
  author,
  publishedAt,
  title,
  description,
  url,
  urlToImage,
  source,
}) {
  return (
    <Card sx={{ width: "100%" }}>
      <CardHeader
        title={
          <CardActionArea href={url} target="_blank">
            <Typography variant="h6">{title}</Typography>
          </CardActionArea>
        }
        subheader={
          <Typography variant="caption" color="text.secondary">
            {author && `${author} - `}
            {source.name} - <Date dateString={publishedAt} />
          </Typography>
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
            width="250"
            image={urlToImage}
            alt={title}
            sx={{
              "@media screen and (min-width: 990px)": {
                width: "30%",
              },
              justifyContent: "flex-start",
            }}
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
