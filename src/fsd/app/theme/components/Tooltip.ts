import { Theme } from "@/fsd/shared/config/theme/theme";
import type { ThemeConfig } from "antd/es/config-provider/context";

export const TooltipConfig = (theme: Theme): ThemeConfig["components"] => {
  return {
    Tooltip: {
      fontSize: 12,
      sizePopupArrow: 12,
    },
  };
};
