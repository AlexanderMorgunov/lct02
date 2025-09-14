import { type ThemeConfig } from "antd/es/config-provider/context";
import { Theme } from "@/fsd/shared/config/theme/theme";

const checkboxColorsLight = {
  colorBorder: "rgb(176, 186, 201)",
};

const checkboxColorsDark = {
  colorBorder: "rgba(160, 165, 173, 0.4)",
  colorBgContainer: "transparent",
};

const checkboxColors = {
  light: checkboxColorsLight,
  dark: checkboxColorsDark,
};

export const CheckboxConfig = (theme: Theme): ThemeConfig["components"] => {
  return {
    Checkbox: {
      borderRadius: 7,
      borderRadiusLG: 7,
      borderRadiusSM: 5,
      ...checkboxColors[theme],
    },
  };
};
