import { createStyles } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import Card from "./Card";

const useStyles = createStyles((_theme, _params, getRef) => ({
  controls: {
    ref: getRef("controls"),
    transition: "opacity 150ms ease",
    opacity: 0,
  },

  root: {
    transition: "transform 150ms ease, box-shadow 150ms ease",
    "&:hover": {
      [`& .${getRef("controls")}`]: {
        opacity: 1,
      },
      transform: "scale(1.01)",
      boxShadow: _theme.shadows.md,
    },
  },
}));

function CustomCarousel({ data }) {
  const { classes } = useStyles();

  return (
    <Carousel
      slideSize="100%"
      height={520}
      loop
      slideGap={"md"}
      classNames={classes}
      controlsOffset="xl"
    >
      <Carousel.Slide>
        <Card hover={false} article={data[0]} />
      </Carousel.Slide>
      <Carousel.Slide>
        <Card hover={false} article={data[1]} />
      </Carousel.Slide>
      <Carousel.Slide>
        <Card hover={false} article={data[2]} />
      </Carousel.Slide>
    </Carousel>
  );
}

export default CustomCarousel;
