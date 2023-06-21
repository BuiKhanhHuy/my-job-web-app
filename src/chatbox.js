import React from 'react';
import { AUTH_CONFIG, ROLES_NAME } from './configs/constants';
import { useSelector } from 'react-redux';

export const MyJobChatBot = () => {
  // const { isAuthenticated, currentUser } = useSelector((state) => state.user);

  // React.useState(() => {
  //   if (isAuthenticated && currentUser?.roleName === ROLES_NAME.EMPLOYER) {
  //     console.log('UPDATE LAI BOT');
  //     window.Kommunicate.updateSettings({
  //       defaultBotIds: [AUTH_CONFIG.EMPLOYER_BOT_ID],
  //       defaultAssignee: AUTH_CONFIG.EMPLOYER_BOT_ID,
  //       skipRouting: true,
  //     });
  //   }
  // }, [isAuthenticated, currentUser]);

  React.useEffect(() => {
    (function (d, m) {
      // var defaultSettings = {
      //   defaultBotIds: [AUTH_CONFIG.JOB_SEEKER_BOT_ID],
      //   defaultAssignee: AUTH_CONFIG.JOB_SEEKER_BOT_ID,
      //   skipRouting: true,
      // };

      var kommunicateSettings = {
        appId: AUTH_CONFIG.CHAT_APP_ID,
        popupWidget: true,
        automaticChatOpenOnNavigation: true,
        onInit: function () {
          // window.Kommunicate.updateSettings(defaultSettings);
          var cssChanges =
            ".mck-msg-right .mck-msg-box{background-color: '#441da0'!important;color:white!important;} .mck-box-top {background-color: '#441da0'!important;}";
          window.Kommunicate.customizeWidgetCss(cssChanges);

          // window.Kommunicate.displayKommunicateWidget(false);
        },
        labels: {
          'input.message': 'Nhập nội dung...',
          'conversations.title': 'Cuộc trò chuyện',
          'start.new': 'Bắt đầu cuộc trò chuyện mới',
          'empty.messages': 'Chưa có tin nhắn!',
          'no.more.messages': 'Không còn tin nhắn nào khác!',
          'empty.conversations': 'Chưa có cuộc trò chuyện nào!',
          'no.more.conversations': 'Không còn cuộc trò chuyện nào nữa!',
          'search.placeholder': 'Tìm kiếm...',
          'location.placeholder': 'Nhập vị trí',
          'members.title': 'Thành viên',
          typing: 'Đang nhập...',
          'is.typing': 'Đang nhập...',
          online: 'Trực tuyến',
          offline: 'Ngoại tuyến',
          'clear.messages': 'Xóa tin nhắn',
          delete: 'Xóa',
          reply: 'Trả lời',
          'location.share.title': 'Chia sẻ vị trí',
          'my.location': 'Vị trí của tôi',
          send: 'Gửi',
          'send.message': 'Gửi tin nhắn',
          smiley: 'Biểu tượng cảm xúc',
          close: 'Đóng',
          edit: 'Chỉnh sửa',
          save: 'Lưu',
          'file.attachment': 'Tải lên tệp đính kèm',
          'file.attach.title': 'Đính kèm tập tin',
          'last.seen': 'Nhìn thấy lần cuối',
          'last.seen.on': 'Nhìn thấy lần đầu',
          'time.format.AM': 'AM',
          'time.format.PM': 'PM',
          hour: 'giờ',
          min: 'phú',
          yesterday: 'hôm qua',
          hours: 'giờ',
          mins: 'phút',
          ago: 'trước',
          admin: 'Quản trị viên',
          user: 'Người dùng',
          member: 'Thành viên',
          you: 'Bạn',
          away: 'Xa',
          'closed.conversation.message':
            'Cuộc hội thoại này đã được đánh dấu là đã giải quyết xong. Nếu bạn có thắc mắc khác, chỉ cần gửi tin nhắn tại đây hoặc bắt đầu một cuộc trò chuyện mới.',
          'search.faq': 'Tìm kiếm trong Câu hỏi thường gặp...',
          'looking.for.something.else': 'Tìm kiếm cái gì khác?',
          'no-faq-found': 'Chúng tôi ở đây để giúp đỡ bạn.',
          'talk.to.agent': 'Nói chuyện với bộ phận chăm sóc khách hàng',
          'how.to.reachout': 'Chúng tôi có thể liên hệ bằng cách nào khác?',
          'email.error.alert': 'Có vẻ như bạn đã nhập một email không hợp lệ',
          'conversation.rated': 'Đánh giá cuộc trò chuyện',
          'char.limit.warn':
            'Giữ tin nhắn của bạn trong vòng 256 ký tự để bot dễ hiểu',
          'limit.remove': 'Xóa',
          'limit.characters': 'ký tự',
          'limit.remaining': 'còn lại',
          'lead.collection': {
            email: 'Email',
            name: 'Tên',
            phone: 'Số điện thoại',
            title: 'Cuộc trò chuyện',
            heading:
              'Trước khi bắt đầu, chúng tôi chỉ cần một vài thông tin chi tiết để có thể phục vụ bạn tốt hơn',
            submit: 'Bắt đầu cuộc trò chuyện',
          },
          'csat.rating': {
            CONVERSATION_RATED: 'Bạn đã xếp hạng cuộc trò chuyện',
            RATE_CONVERSATION: 'Xếp hạng cuộc hội thoại của bạn',
            CONVERSATION_REVIEW_PLACEHOLDER: 'Thêm nhận xét...',
            OTHER_QUERIES: 'Bạn có câu hỏi nào khác? ',
            RESTART_CONVERSATION: 'Bắt đầu lại cuộc trò chuyện này',
            SUBMIT_RATING: 'Gửi đánh giá của bạn',
          },
          'conversation.header.dropdown': {
            CSAT_RATING_TEXT: 'Xếp hạng cuộc trò chuyện này',
            USER_OVERIDE_VOICE_OUTPUT_ON: 'Bật chuyển văn bản thành giọng nói',
            USER_OVERIDE_VOICE_OUTPUT_OFF: 'Tắt chuyển văn bản thành giọng nói',
          },
          'page.title.on.new.message': 'Tin nhắn mới từ ',
          'emoji.hover.text': {
            poor: 'Thấp',
            great: 'Tuyệt vời',
            average: 'Trung bình',
          },
          'rich.message': {
            'notification.preview': 'Tin nhắn',
          },
          'filter.conversation.list': {
            ALL_CONVERSATIONS: 'Tất cả cuộc trò chuyện',
            ACTIVE_CONVERSATIONS: 'Cuộc hội thoại đang hoạt động',
            HIDE_RESOLVED: 'Đã giải quyết ẩn',
            SHOW_RESOLVED: 'Hiển thị đã giải quyết',
          },
          'time.stamp': {
            'sec.ago': 'giây trước',
            'secs.ago': 'giây trước',
            'min.ago': 'phút trước',
            'mins.ago': 'phút trước',
            'hr.ago': 'giờ trước',
            'hrs.ago': 'giờ trước',
          },
          'voice.output': {
            location: {
              init: 'Một vị trí đã được chia sẻ với bạn.',
              lat: 'Vĩ độ là ',
              lon: 'và Kinh độ là ',
            },
            attachment: 'Bạn có một tập tin đính kèm.',
          },
          'waiting.queue.message': {
            'contact.name': 'Đang xếp hàng...',
            'header.text': 'Đang xếp hàng...',
            'first.Part': 'Hiện tại bạn',
            'waiting.queue.number': '5',
            'last.part':
              ' trong hàng đợi, bộ phận chăm sóc khách hàng của chúng tôi sẽ liên hệ lại với bạn ngay',
          },
        },
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
