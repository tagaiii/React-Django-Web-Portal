import React from "react";
import { createStyles, Card, Text, Image, Paper } from "@mantine/core";
import { Link } from "react-router-dom";

function NewsCard({ article }) {
  const useStyles = createStyles((theme) => ({
    wrapper: {
      width: "100%",
    },
    card: {
      transition: "transform 150ms ease, box-shadow 150ms ease",

      "&:hover": {
        transform: "scale(1.01)",
        boxShadow: theme.shadows.md,
      },
    },

    title: {
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
      fontWeight: 600,
    },
  }));
  const { classes } = useStyles();

  let date = new Date(article?.created_at).toLocaleDateString();
  return (
    <div className={classes.wrapper}>
      <Link to={`/articles/${article?.id}`}>
        <Card key={article?.id} p="xs" radius="xs" className={classes.card}>
          <Card.Section>
            <Image src={article?.image} height={120} p="xs"/>
          </Card.Section>
          <Paper className="h-24 flex flex-col justify-between">
            <Text className={classes.title} mt={5} size="md">
              {article?.header}
            </Text>
            <Text
              color="dimmed"
              size="xs"
              transform="uppercase"
              weight={700}
              mt={5}
            >
              {date}
            </Text>
          </Paper>
        </Card>
      </Link>
    </div>
  );
}

export default NewsCard;
