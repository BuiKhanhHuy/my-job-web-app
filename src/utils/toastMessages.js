import { toast } from 'react-toastify';

const toastMessages = {
  success: (message) =>
    toast.success(message, {
      theme: 'colored',
      delay: 0,
    }),
  error: (message) =>
    toast.error(message, {
      theme: 'colored',
      delay: 0,
    }),
  warn: (message) =>
    toast.warn(message, {
      theme: 'colored',
      delay: 0,
    }),
  info: (message) =>
    toast.info(message, {
      theme: 'colored',
      delay: 0,
    }),
};

export default toastMessages;
