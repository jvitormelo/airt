import { GetOneImage, getOneImage } from "@/api/arts/get-one-image";
import { FavoriteButton } from "@/components/core/favorite-button/FavoriteButton";

import {
  Badge,
  Box,
  Container,
  createStyles,
  Flex,
  Group,
  Image,
  Text,
  Title,
} from "@mantine/core";
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  try {
    const id = params?.id;

    if (!id) {
      return {
        notFound: true,
      };
    }

    const image = await getOneImage(id);

    return {
      props: {
        image,
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

interface Props {
  image: GetOneImage;
}

const useStyles = createStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing.md,
  },
  image: {
    justifySelf: "center",
    position: "relative",

    img: {
      borderRadius: theme.radius.md,
    },
  },
}));

const ImagePage = ({ image }: Props) => {
  const { classes } = useStyles();

  return (
    <Container style={{ minHeight: "100vh" }}>
      <Box component="section" className={classes.root}>
        <Box>
          <Title>{image.name}</Title>

          <Group mt={"md"}>
            {image.tags.map((tag) => (
              <Badge size="lg" variant="light" key={tag.name}>
                {tag.name}
              </Badge>
            ))}
          </Group>
        </Box>

        <Image src={image.url} alt={image.name} className={classes.image} />
      </Box>

      <Flex mt={"md"} justify="space-between">
        <Flex>
          <Image
            src={image.user.picture}
            width={50}
            radius="xl"
            alt={image.user.name}
            height={50}
          />
          <Box ml={"md"}>
            <Text lineClamp={1} size="lg" weight="bold">
              {image.user.name}
            </Text>

            <Text size="md">maybe some info</Text>
          </Box>
        </Flex>
        <FavoriteButton artId={image.id} />
      </Flex>
    </Container>
  );
};

export default ImagePage;
