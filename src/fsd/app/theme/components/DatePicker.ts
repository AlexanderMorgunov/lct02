import { type ThemeConfig } from "antd/es/config-provider/context";
import { Theme } from "@/fsd/shared/config/theme/theme";

const datePickerColorsLight = {
  colorBorder: "rgb(176, 186, 201)",
  colorText: "rgb(0, 0, 0)",
};

const datePickerColorsDark = {
  colorBorder: "rgba(160, 165, 173, 0.4)",
  colorText: "rgb(255,255,255)",
  colorBgContainer: "transparent",
};

const datePickerColors = {
  light: datePickerColorsLight,
  dark: datePickerColorsDark,
};

export const DatePickerConfig = (theme: Theme): ThemeConfig["components"] => {
  return {
    DatePicker: {
      borderRadius: 7,
      borderRadiusLG: 7,
      borderRadiusSM: 5,
      paddingInline: 10,
      paddingInlineLG: 10,
      paddingInlineSM: 10,
      inputFontSizeLG: 14,
      inputFontSizeSM: 12,
      paddingBlock: 6.5,
      paddingBlockLG: 10.5,
      paddingBlockSM: 4,
      ...datePickerColors[theme],
    },
  };
};
