import React from 'react';
import { AUTH_CONFIG, ROLES_NAME } from './configs/constants';
import { useSelector } from 'react-redux';

export const MyJobChatBot = () => {
  const { isAuthenticated, currentUser } = useSelector((state) => state.user);
  const [chatbotConfig, setChatbotConfig] = React.useState(
    AUTH_CONFIG.JOB_SEEKER_BOT
  );

  React.useEffect(() => {
    if (isAuthenticated && currentUser?.roleName === ROLES_NAME.EMPLOYER) {
      setChatbotConfig(AUTH_CONFIG.EMPLOYER_BOT);
    } else {
      setChatbotConfig(AUTH_CONFIG.JOB_SEEKER_BOT);
    }
  }, [isAuthenticated, currentUser]);

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `<df-messenger
    intent="WELCOME"
    chat-title="${chatbotConfig.CHAT_TITLE}"
    agent-id="${chatbotConfig.AGENT_ID}"
    language-code="en"
    chat-icon="${chatbotConfig.CHAT_ICON}"
  ></df-messenger>`,
      }}
    />
  );
};
