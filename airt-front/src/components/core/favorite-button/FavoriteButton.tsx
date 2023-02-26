import {
  GetIsLikedResponse,
  getUseIsLikedKey,
  useIsLiked,
} from "@/api/arts/is-liked";
import { useLikeArtMutation } from "@/api/arts/like-art";
import { queryClient } from "@/api/query-client";
import { useNotification } from "@/hooks/use-notification";
import { useUser } from "@/hooks/use-user";
import { Box, createStyles } from "@mantine/core";
import { HiHeart } from "react-icons/hi";

interface Props {
  artId: number;
}

const useStyles = createStyles((theme) => ({
  icon: {
    height: "40px",
    width: "40px",
    borderRadius: "8px",
    cursor: "pointer",
    border: "1px solid white",
    transition: "all 0.3s ease-in-out",
    '&[data-liked="true"]': {
      fill: theme.primaryColor,
      borderColor: theme.primaryColor,
    },
  },
  box: {
    minWidth: "40px",
    minHeight: "40px",
  },
}));

export const FavoriteButton = ({ artId }: Props) => {
  const { openNotification } = useNotification();
  const { isAuth } = useUser();
  const { data, isLoading } = useIsLiked({ artId });
  const { classes } = useStyles();

  const isLiked = data?.liked || false;

  const { mutate } = useLikeArtMutation({
    onMutate: ({ liked }) => {
      queryClient.setQueryData<GetIsLikedResponse>(
        getUseIsLikedKey({ artId }),
        {
          liked,
        }
      );
    },
    onError: (_, { liked }) => {
      queryClient.setQueryData(getUseIsLikedKey({ artId }), {
        isLiked: !liked,
      });
    },
    onSuccess(data) {
      if (data.liked)
        openNotification({
          title: "Liked",
          message: "You liked this art, you can see it in your profile",
        });
    },
  });

  if (isLoading) return null;

  async function handleLike() {
    if (!isAuth) {
      // TODO CHANGE to modal
      alert("You need to be logged in to like an art");
    }

    const liked = !isLiked;

    mutate({
      artId,
      liked,
    });

    if (liked) {
    }
  }

  return (
    <Box className={classes.box}>
      <HiHeart
        data-liked={isLiked}
        className={classes.icon}
        onClick={handleLike}
      />
    </Box>
  );
};
