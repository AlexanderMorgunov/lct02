import { Theme } from "@/fsd/shared/config/theme/theme";
import type { ThemeConfig } from "antd/es/config-provider/context";

export const PopoverConfig = (theme: Theme): ThemeConfig["components"] => {
  return {
    Popover: {
      borderRadiusLG: 20,
    },
  };
};
