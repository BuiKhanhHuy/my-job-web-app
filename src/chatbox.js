import React from 'react';
import { AUTH_CONFIG } from './configs/constants';

export const MyJobChatBot = () => {
  React.useEffect(() => {
    (function (d, m) {
      var kommunicateSettings = {
        appId: AUTH_CONFIG.CHAT_APP_ID,
        popupWidget: true,
        automaticChatOpenOnNavigation: true,
      };
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.async = true;
      s.src = 'https://widget.kommunicate.io/v2/kommunicate.app';
      var h = document.getElementsByTagName('head')[0];
      h.appendChild(s);
      window.kommunicate = m;
      m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});
  }, []);

  return <div></div>;
};
