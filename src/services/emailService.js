import httpRequest from '../utils/httpRequest';

const emailService = {
  sendEmailReplyToJobSeeker: (data) => {
    const url = 'api/info/web/email-reply-to-job-seeker/';

    return httpRequest.post(url, data);
  },
};

export default emailService;

