import { type ThemeConfig } from "antd/es/config-provider/context";
import { Theme } from "@/fsd/shared/config/theme/theme";

const selectColorsLight = {
  colorBorder: "rgb(176, 186, 201)",
};

const selectColorsDark = {
  colorBorder: "rgba(160, 165, 173, 0.4)",
  colorBgContainer: "transparent",
};

const selectColors = {
  light: selectColorsLight,
  dark: selectColorsDark,
};

export const SelectConfig = (theme: Theme): ThemeConfig["components"] => {
  return {
    Select: {
      controlHeight: 36.6,
      controlHeightLG: 40,
      controlHeightSM: 24,
      controlHeightXS: 18,
      fontSize: 14,
      fontSizeLG: 14,
      fontSizeXL: 14,
      fontSizeSM: 12,
      optionFontSize: 14,
      borderRadiusLG: 7,
      borderRadius: 7,
      borderRadiusSM: 5,
      optionSelectedFontWeight: 400,
      showArrowPaddingInlineEnd: 15,
      ...selectColors[theme],
    },
  };
};
