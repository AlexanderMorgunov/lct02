import { type ThemeConfig } from "antd/es/config-provider/context";
import { Theme } from "@/fsd/shared/config/theme/theme";

const buttonColorsLight = {
  defaultBorderColor: "rgb(0, 123, 255)",
  defaultColor: "rgb(0, 123, 255)",
  defaultGhostColor: "rgb(140, 143, 147)",
  defaultGhostBorderColor: "transparent",
  ghostBg: "rgb(245, 245, 245)",
};

const buttonColorsDark = {
  defaultBorderColor: "rgb(0, 123, 255)",
  defaultColor: "rgba(0, 123, 255)",
  defaultGhostColor: "rgb(140, 143, 147)",
  defaultGhostBorderColor: "transparent",
  ghostBg: "rgb(245, 245, 245)",
};

const buttonColors = {
  light: buttonColorsLight,
  dark: buttonColorsDark,
};

export const ButtonConfig = (theme: Theme): ThemeConfig["components"] => {
  return {
    Button: {
      contentFontSizeSM: 12,
      controlHeight: 40,
      controlHeightSM: 30,
      controlHeightLG: 50,
      paddingInlineSM: 45,
      paddingInlineLG: 45,
      paddingInline: 45,
      borderRadiusLG: 10,
      borderRadius: 10,
      borderRadiusSM: 10,
      ...buttonColors[theme],
    },
  };
};
