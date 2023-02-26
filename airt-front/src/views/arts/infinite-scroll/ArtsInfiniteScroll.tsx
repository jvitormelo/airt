import { useInfiniteGetAllImages } from "@/api/arts/get-all-images";
import { ArtCard } from "@/components/core/art-card/ArtCard";
import { InfiniteScroll } from "@/components/infinite-scroll/InfiniteScroll";
import { useArtsStore } from "@/views/arts/store/arts-store";
import { SimpleGrid } from "@mantine/core";

export const ArtsInfiniteScroll = () => {
  const { tags, sortBy } = useArtsStore();

  const { data, error, fetchNextPage, hasNextPage } = useInfiniteGetAllImages(
    tags,
    sortBy
  );

  const allRows = data ? data.pages.flatMap((item) => item.data) : [];

  if (error) {
    return (
      <div>
        <p>Error: {(error as Error)?.message}</p>
      </div>
    );
  }

  return (
    <InfiniteScroll hasNextPage={hasNextPage} onNextPage={fetchNextPage}>
      <SimpleGrid
        cols={3}
        breakpoints={[
          { maxWidth: "sm", cols: 1 },
          { maxWidth: "md", cols: 2 },
        ]}
      >
        {allRows.map((item) => (
          <ArtCard {...item} key={item.id} />
        ))}
      </SimpleGrid>
    </InfiniteScroll>
  );
};
