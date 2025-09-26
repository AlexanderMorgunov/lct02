import { useThemeStore } from "@/fsd/shared/store/theme/useThemeStore";
export const useThemeChat = () => {
  const { theme: currentTheme } = useThemeStore();

  const colors = {
    light: {
      buttonBg: "#ffffff",
      buttonIcon: "#001529",
      chatBg: "#f5f5f5",
      text: "#000000",
      userMessageBg: "#001529",
      userMessageText: "#ffffff",
    },
    dark: {
      buttonBg: "#001529",
      buttonIcon: "#ffffff",
      chatBg: "#141414",
      text: "#ffffff",
      userMessageBg: "#303235",
      userMessageText: "#ffffff",
    },
  };

  const themeColors = colors[currentTheme];

  return { themeColors };
};
