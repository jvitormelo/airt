import {
  Box,
  CloseButton,
  createStyles,
  Group,
  Image,
  Text,
} from "@mantine/core";

import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useState } from "react";

const useStyles = createStyles((theme) => ({
  image: {
    display: "flex",
    position: "relative",
    width: "100%",
    flexDirection: "column",
    aspectRatio: "1/1",
    img: {
      borderRadius: theme.radius.md,
    },
  },
  dropzone: {
    width: "100%",
    ".mantine-Dropzone-inner": {
      height: "100%",
    },
  },
  imageMenu: {
    borderRadius: theme.radius.md,
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    padding: theme.spacing.xs,
    minWidth: "4rem",
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
  },
}));

interface Props {
  file: File | null;
  setFile: (file: File | null) => void;
  initialImage?: string;
}

export const ImageUpload = ({ file, setFile, initialImage }: Props) => {
  const [defaultImage, setDefaultImage] = useState<null | string>(
    initialImage || null
  );

  const imageBlob = (() => {
    if (!file) return defaultImage || null;

    const blob = new Blob([file], { type: "image/png" });

    return URL.createObjectURL(blob);
  })();

  const receiveFiles = (files: File[]) => {
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  const removeImage = () => {
    setFile(null);
    setDefaultImage(null);
  };

  const { classes } = useStyles();
  return (
    <Box
      component="aside"
      sx={{
        display: "flex",
        flex: 2,
      }}
    >
      {imageBlob ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Image
            className={classes.image}
            alt={file?.name || "image"}
            src={imageBlob}
          />

          <Group mt={"sm"} mx={"auto"} className={classes.imageMenu}>
            <CloseButton onClick={removeImage} color={"red.9"} size="lg" />
          </Group>
        </div>
      ) : (
        <Dropzone
          className={classes.dropzone}
          onDrop={receiveFiles}
          onReject={(files) => console.error("rejected files", files)}
          maxSize={3 * 1024 ** 2}
          multiple={false}
          accept={IMAGE_MIME_TYPE}
        >
          <Group
            position="center"
            spacing="xl"
            style={{ minHeight: "100%", pointerEvents: "none" }}
          >
            <div>
              <Text size="xl" inline>
                Drag images here or click to select files
              </Text>
              <Text size="sm" color="dimmed" inline mt={7}>
                Attach as many files as you like, each file should not exceed
                5mb
              </Text>
            </div>
          </Group>
        </Dropzone>
      )}
    </Box>
  );
};
