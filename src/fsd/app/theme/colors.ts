import { Theme } from "@/fsd/shared/config/theme/theme";

export const light = {
  primary: "#007BFF",
};

export const dark = {
  primary: "#007BFF",
};

export const colorsMap = {
  light: light,
  dark: dark,
};

export const ThemeColors = (theme: Theme) => {
  return colorsMap[theme];
};
