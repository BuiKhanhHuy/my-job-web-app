import React from 'react';

export const MyJobChatBot = () => {
  React.useEffect(() => {
    (function (d, m) {
      var kommunicateSettings = {
        appId: '35d278df447ef1a978999f93358dd91e9',
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
