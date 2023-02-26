import { Button, Flex, Stack, Title } from "@mantine/core";
import Link from "next/link";
import { ComponentProps, FC } from "react";
import { ArtCarousel } from "../art-carousel/ArtCarousel";
import { AiOutlineArrowRight } from "react-icons/ai";

type ArtCarouselProps = ComponentProps<typeof ArtCarousel>;

type ActionButton = {
  label: string;
  onClick?: () => void;
  href: string;
};

type Props = ArtCarouselProps & {
  title: string;
  actionButton: ActionButton;
};

const ArtSectionComponent: FC<Props> = ({
  title,
  actionButton,
  ...artsCarouselProps
}) => {
  return (
    <Stack>
      <Title>{title}</Title>
      <ArtCarousel {...artsCarouselProps} />

      <Flex ml={"auto"}>
        <Link passHref href={actionButton.href}>
          <Button
            rightIcon={<AiOutlineArrowRight />}
            onClick={actionButton.onClick}
          >
            {actionButton.label}
          </Button>
        </Link>
      </Flex>
    </Stack>
  );
};

export const ArtSection = ArtSectionComponent;
