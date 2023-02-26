import { Routes } from "@/routes";
import { ImageEntity } from "@/types/entities/image";
import { Box, createStyles } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";

interface ImageCardProps extends ImageEntity {
  imageKey: string;
}

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    aspectRatio: "1 / 1",
  },
  image: {
    borderRadius: theme.radius.sm,

    "&:hover": {
      transform: "scale(1.01)",
    },
    // add a transition to the image
    transition: "transform 0.3s ease-in-out",
  },
}));

export const ImageCard = ({ id, url, name }: ImageCardProps) => {
  const { classes } = useStyles();

  return (
    <Box className={classes.wrapper}>
      <Link href={Routes.Art(id)} passHref>
        <Image
          className={classes.image}
          fill
          alt={name}
          quality={100}
          src={url}
        />
      </Link>
    </Box>
  );
};
