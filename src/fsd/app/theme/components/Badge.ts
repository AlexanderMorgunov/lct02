import { Theme } from "@/fsd/shared/config/theme/theme";
import type { ThemeConfig } from "antd/es/config-provider/context";

export const BadgeConfig = (theme: Theme): ThemeConfig["components"] => {
  return {
    Badge: {
      textFontSize: 8,
    },
  };
};
