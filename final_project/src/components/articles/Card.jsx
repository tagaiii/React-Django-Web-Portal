import React from "react";
import {
  createStyles,
  Card,
  Text,
  Image,
  useMantineTheme,
} from "@mantine/core";
import { Link } from "react-router-dom";

const PRIMARY_COL_HEIGHT = 520;

function NewsCard({ hover, article }) {
  const theme = useMantineTheme();
  const SECONDARY_COL_HEIGHT = PRIMARY_COL_HEIGHT / 2 - theme.spacing.xs / 2;

  const useStyles = createStyles((theme) => ({
    cardMain: {
      transition: "transform 150ms ease, box-shadow 150ms ease",
      height: PRIMARY_COL_HEIGHT,

      "&:hover": {
        transform: "scale(1.01)",
        boxShadow: theme.shadows.md,
      },
    },
    card: {
      transition: "transform 150ms ease, box-shadow 150ms ease",
      height: SECONDARY_COL_HEIGHT,

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
    <Link to={`/articles/${article?.id}`}>
      <Card
        key={article?.id}
        p="xs"
        radius="xs"
        className={
          hover
            ? `${classes.card} bg-white hover:bg-slate-100`
            : `${classes.cardMain} bg-white hover:bg-slate-100`
        }
      >
        <Card.Section>
          <Image
            src={article?.image}
            height={
              hover ? SECONDARY_COL_HEIGHT * 0.7 : PRIMARY_COL_HEIGHT * 0.83
            }
          />
        </Card.Section>
        <Text className={classes.title} mt={5} size="md">
          {article?.header.slice(0, 80)}
        </Text>
        <Text
          color="dimmed"
          size="xs"
          transform="uppercase"
          weight={700}
          mb={5}
        >
          {date}
        </Text>
      </Card>
    </Link>
  );
}

export default NewsCard;
