"use client";
import { BubbleChat } from "flowise-embed-react";
import { useThemeChat } from "../hooks/useThemeChat";

export const Chat = () => {
  const { themeColors } = useThemeChat();

  return (
    <BubbleChat
      chatflowid={process.env.NEXT_PUBLIC_CHAT_ID}
      apiHost={process.env.NEXT_PUBLIC_APP_BASE_URL}
      className="fixed bottom-5 right-5 z-50"
      position="bottom-right"
      theme={{
        button: {
          backgroundColor: themeColors.buttonBg,
          right: 20,
          bottom: 20,
          size: 56,
          iconColor: themeColors.buttonIcon,
          autoWindowOpen: { autoOpen: false },
          tooltip: {
            showTooltip: true,
            tooltipMessage: "Привет👋!",
            tooltipBackgroundColor: "black",
            tooltipTextColor: "white",
            tooltipFontSize: 16,
          },
        },
        chatWindow: {
          showTitle: true,
          showAgentMessages: true,
          title: "AI-Капля",
          titleAvatarSrc: "/images/logo.svg",
          welcomeMessage: "Привет! Введите ваш вопрос",
          errorMessage: "Произошла ошибка",
          backgroundColor: themeColors.chatBg,
          fontSize: 16,
          starterPrompts: ["Что это за бот?"],
          clearChatOnReload: false,
          renderHTML: true,
          userMessage: {
            backgroundColor: themeColors.userMessageBg,
            textColor: themeColors.userMessageText,
            showAvatar: true,
            avatarSrc:
              "https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/usericon.png",
          },
          textInput: {
            placeholder: "Введите ваш вопрос",
            backgroundColor: themeColors.chatBg,
            textColor: themeColors.text,
            sendButtonColor: themeColors.userMessageBg,
            maxChars: 100,
            autoFocus: true,
          },
          footer: {
            textColor: themeColors.text,
            company: "МосТруба",
            companyLink: "#",
          },
        },
      }}
    />
  );
};
