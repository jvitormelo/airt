import { MantineThemeOverride } from "@mantine/core";

export const appTheme: MantineThemeOverride = {
  colorScheme: "dark",
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  components: {
    Button: {
      defaultProps: {
        loaderPosition: "right",
      },
    },
  },
  colors: {
    gold: [
      "#FFA500",
      "#FFB84D",
      "#FFA500",
      "#FF8C00",
      "#FF7300",
      "#E65C00",
      "#CC5500",
      "#FFA500",
      "#FFA500",
      "#803300",
    ],
  },
  primaryColor: "gold",
};
