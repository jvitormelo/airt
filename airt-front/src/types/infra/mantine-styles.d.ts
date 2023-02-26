import { Tuple, DefaultMantineColor } from "@mantine/core";

type ExtendedCustomColors =
  | "primaryColorName"
  | "secondaryColorName"
  | DefaultMantineColor;

declare module "@mantine/core" {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, Tuple<"gold", 10>>;
  }
}
