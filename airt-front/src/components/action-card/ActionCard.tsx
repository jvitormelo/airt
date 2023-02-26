import { Box, createStyles, Text } from "@mantine/core";
import { memo } from "react";
import { LinkWrapper } from "../link-wrapper/LinkWrapper";

interface Props {
  title: string;
  href?: string;
  onClick?: () => void;
  color?: string;
}

const useStyles = createStyles((theme, { color }: Pick<Props, "color">) => ({
  wrapper: {
    cursor: "pointer",
    display: "flex",

    width: "150px",
    height: "150px",
    backgroundColor: color ? theme.colors[color][6] : theme.colors.gold[6],
    borderRadius: theme.radius.md,
    padding: theme.spacing.sm,
    alignItems: "flex-end",
  },
  title: {
    color: "white",
    fontSize: "1.1rem",
    fontWeight: 600,
  },
}));

const ActionCardComponent = ({ title, href, color, onClick }: Props) => {
  const { classes } = useStyles({ color });

  return (
    <LinkWrapper href={href}>
      <Box className={classes.wrapper} onClick={onClick}>
        <Text className={classes.title}>{title}</Text>
      </Box>
    </LinkWrapper>
  );
};

export const ActionCard = memo(ActionCardComponent);
