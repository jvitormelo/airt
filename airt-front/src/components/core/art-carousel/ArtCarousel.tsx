import { Carousel } from "@mantine/carousel";
import { ComponentProps, FC } from "react";
import { ArtCard } from "../art-card/ArtCard";

type ArtCardProps = ComponentProps<typeof ArtCard>;

interface Props {
  arts: ArtCardProps[];
}

export const ArtCarousel: FC<Props> = ({ arts = [] }) => {
  return (
    <Carousel
      loop
      slideSize={300}
      slideGap="md"
      withControls={false}
      align="start"
      breakpoints={[
        { maxWidth: "md", slideSize: "40%" },
        { maxWidth: "sm", slideSize: "60%" },
        { maxWidth: "xs", slideSize: "90%" },
      ]}
    >
      {arts.map((art) => (
        <Carousel.Slide key={art.id}>
          <ArtCard {...art} />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
};
