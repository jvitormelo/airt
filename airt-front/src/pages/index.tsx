import { getAllImages } from "@/api/arts/get-all-images";
import { ArtSection } from "@/components/core/art-section/ArtSection";
import { Routes } from "@/routes";
import { HomeActionsCards } from "@/views/home/actions/HomeActionsCards";
import { Stack } from "@mantine/core";
import { GetStaticProps } from "next";
import { ComponentProps } from "react";

interface Props {
  sections: ComponentProps<typeof ArtSection>[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const recentArts = (await getAllImages()).data;

    return {
      props: {
        sections: [
          {
            title: "Recent Arts",
            actionButton: {
              href: Routes.Arts,
              label: "View All",
            },
            arts: recentArts,
          },
          {
            title: "Most Viewed",
            actionButton: {
              href: Routes.Arts,
              label: "View All",
            },
            arts: recentArts,
          },
        ],
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

const Home = ({ sections }: Props) => {
  return (
    <Stack>
      <HomeActionsCards />

      {sections.map((section) => (
        <ArtSection key={section.title} {...section} />
      ))}
    </Stack>
  );
};

export default Home;
