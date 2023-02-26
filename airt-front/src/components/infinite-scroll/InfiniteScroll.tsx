import { Loader, Stack } from "@mantine/core";
import { useEffect, useRef } from "react";

interface Props {
  children: React.ReactNode;
  onNextPage: () => void;
  hasNextPage?: boolean;
}

// Simple infinite scroll
export const InfiniteScroll = ({
  hasNextPage,
  children,
  onNextPage,
}: Props) => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        onNextPage();
      }
    });

    if (divRef.current) observer.observe(divRef.current);

    return () => observer.disconnect();
  }, [onNextPage]);

  return (
    <Stack>
      {children}

      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          marginBlock: "24px",
        }}
        ref={divRef}
      >
        {hasNextPage && <Loader />}
      </div>
    </Stack>
  );
};

// Need to study this one:
// function VirtualizedList() {
//   const {
//     status,
//     data,
//     error,
//     isFetching,
//     isFetchingNextPage,
//     fetchNextPage,
//     hasNextPage,
//   } = useInfiniteGetAllImages();

//   const allRows = data ? data.pages.flatMap((item) => item.data) : [];

//   const parentRef = useRef<HTMLDivElement>();

//   const rowVirtualizer = useVirtualizer({
//     count: hasNextPage ? allRows.length + 1 : allRows.length,
//     getScrollElement: () => parentRef.current || document.body,
//     estimateSize: () => 100,
//     overscan: 5,
//   });

//   useEffect(() => {
//     const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();

//     if (!lastItem) {
//       return;
//     }

//     if (
//       lastItem.index >= allRows.length - 1 &&
//       hasNextPage &&
//       !isFetchingNextPage
//     ) {
//       fetchNextPage();
//     }
//   }, [
//     hasNextPage,
//     fetchNextPage,
//     allRows.length,
//     isFetchingNextPage,
//     rowVirtualizer,
//   ]);

//   if (status === "loading") {
//     return <p>Loading...</p>;
//   }

//   if (status === "error") {
//     return <p>Error: {(error as Error).message}</p>;
//   }

//   return (
//     <div>
//       {
//         <div
//           ref={parentRef}
//           style={{
//             height: `800px`,
//             width: `100%`,
//             overflow: "auto",
//           }}
//         >
//           <div
//             style={{
//               height: `${rowVirtualizer.getTotalSize()}px`,
//               width: "100%",
//               position: "relative",
//             }}
//           >
//             {rowVirtualizer.getVirtualItems().map((virtualRow) => {
//               const isLoaderRow = virtualRow.index > allRows.length - 1;
//               const post = allRows[virtualRow.index];

//               return (
//                 <div
//                   key={virtualRow.index}
//                   style={{
//                     position: "absolute",
//                     top: 0,
//                     left: 0,
//                     width: "100%",
//                     height: `${virtualRow.size}px`,
//                     transform: `translateY(${virtualRow.start}px)`,
//                   }}
//                 >
//                   {isLoaderRow
//                     ? hasNextPage
//                       ? "Loading more..."
//                       : "Nothing more to load"
//                     : post.id}
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       }
//       <div>
//         {isFetching && !isFetchingNextPage ? "Background Updating..." : null}
//       </div>
//     </div>
//   );
// }
