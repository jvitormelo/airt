import { ArtsFilterForm } from "@/views/arts/form/ArtsFilterForm";
import { ArtsInfiniteScroll } from "@/views/arts/infinite-scroll/ArtsInfiniteScroll";
import { Stack } from "@mantine/core";

const ArtsPage = () => {
  return (
    <Stack>
      <ArtsFilterForm />
      <ArtsInfiniteScroll />
    </Stack>
  );
};

export default ArtsPage;
