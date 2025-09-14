import { theme } from "antd";
import { type ThemeConfig } from "antd/es/config-provider/context";
import { ButtonConfig } from "@/fsd/app/theme/components/Button";
import { SelectConfig } from "@/fsd/app/theme/components/Select";
import { TooltipConfig } from "@/fsd/app/theme/components/Tooltip";
import { PopoverConfig } from "@/fsd/app/theme/components/Popover";
import { ThemeColors } from "@/fsd/app/theme/colors";
import { InputConfig } from "@/fsd/app/theme/components/Input";
import { BadgeConfig } from "@/fsd/app/theme/components/Badge";
import { DatePickerConfig } from "@/fsd/app/theme/components/DatePicker";
import { CheckboxConfig } from "@/fsd/app/theme/components/CheckBox";
import { Theme } from "@/fsd/shared/config/theme/theme";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  variable: "--montserrat-font",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const lightTheme: ThemeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: ThemeColors(Theme.LIGHT).primary,
    wireframe: true,
    fontFamily: montserrat.style.fontFamily,
  },
  components: {
    ...ButtonConfig(Theme.LIGHT),
    ...SelectConfig(Theme.LIGHT),
    ...TooltipConfig(Theme.LIGHT),
    ...PopoverConfig(Theme.LIGHT),
    ...InputConfig(Theme.LIGHT),
    ...BadgeConfig(Theme.LIGHT),
    ...DatePickerConfig(Theme.LIGHT),
    ...CheckboxConfig(Theme.LIGHT),
  },
};

export const darkTheme: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: ThemeColors(Theme.DARK).primary,
    wireframe: true,
    fontFamily: montserrat.style.fontFamily,
  },
  components: {
    ...ButtonConfig(Theme.DARK),
    ...SelectConfig(Theme.DARK),
    ...TooltipConfig(Theme.DARK),
    ...PopoverConfig(Theme.DARK),
    ...InputConfig(Theme.DARK),
    ...BadgeConfig(Theme.DARK),
    ...DatePickerConfig(Theme.DARK),
    ...CheckboxConfig(Theme.DARK),
  },
};
