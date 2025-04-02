import React from "react";
import { AUTH_CONFIG, HOST_NAME } from "./configs/constants";
import { useSelector } from "react-redux";

export const MyJobChatBot = () => {
  const hostName = window.location.hostname;
  const { isAuthenticated, currentUser } = useSelector((state) => state.user);
  const [chatbotConfig, setChatbotConfig] = React.useState(null);

  React.useEffect(() => {
    switch (hostName) {
      case HOST_NAME.MYJOB:
        setChatbotConfig(AUTH_CONFIG.JOB_SEEKER_BOT);
        break;
      case HOST_NAME.EMPLOYER_MYJOB:
        setChatbotConfig(AUTH_CONFIG.EMPLOYER_BOT);
        break;
      default:
        setChatbotConfig(AUTH_CONFIG.JOB_SEEKER_BOT);
    }
  }, [hostName]);

  if (!chatbotConfig) return <></>;

  return (
    <div
      dangerouslySetInnerHTML={{
                __html: `<df-messenger
            intent="WELCOME"
            chat-title="${chatbotConfig.CHAT_TITLE}"
            agent-id=${chatbotConfig.AGENT_ID}
            language-code="en"
            chat-icon="${chatbotConfig.CHAT_ICON}"
          ></df-messenger>`,
      }}
    />
  );
};
