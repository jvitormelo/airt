import { ImageWithTags } from "@/types/entities/image";
import Link from "next/link";
import Image from "next/image";
import { FC, memo } from "react";
import { Card, createStyles } from "@mantine/core";
import { Routes } from "@/routes";

type Props = Pick<ImageWithTags, "id" | "name" | "url">;

const useStyles = createStyles(() => ({
  card: {
    position: "relative",
    height: "300px",
    width: "100%",
  },
}));

const ArtCardComponent: FC<Props> = ({ url, name, id }) => {
  const { classes } = useStyles();
  const href = Routes.Art(id);

  return (
    <Link passHref href={href}>
      <Card className={classes.card} shadow="sm" p="lg" radius="md" withBorder>
        <Image fill src={url} alt={name} />
      </Card>
    </Link>
  );
};

export const ArtCard = memo(ArtCardComponent);
