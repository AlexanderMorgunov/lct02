import { type ThemeConfig } from "antd/es/config-provider/context";
import { Theme } from "@/fsd/shared/config/theme/theme";

const inputColorsLight = {
  colorBorder: "rgb(176, 186, 201)",
  colorText: "rgb(0, 0, 0)",
};

const inputColorsDark = {
  colorBorder: "rgba(160, 165, 173, 0.4)",
  colorText: "rgb(255,255,255)",
  colorBgContainer: "transparent",
};

const inputColors = {
  light: inputColorsLight,
  dark: inputColorsDark,
};

export const InputConfig = (theme: Theme): ThemeConfig["components"] => {
  return {
    Input: {
      borderRadius: 7,
      borderRadiusLG: 7,
      borderRadiusSM: 5,
      paddingInline: 10,
      paddingInlineLG: 10,
      paddingInlineSM: 10,
      inputFontSizeLG: 14,
      inputFontSizeSM: 12,
      paddingBlock: 6.5,
      paddingBlockLG: 8.8,
      paddingBlockSM: 4,
      ...inputColors[theme],
    },
  };
};
