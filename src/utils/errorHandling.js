import toastMessages from './toastMessages';

const errorHandling = (error, setError = null) => {
  const res = error.response;

  switch (res.status) {
    case 400:
      const errors = res.data?.errors;
      if ('errorMessage' in errors) {
        toastMessages.error(errors.errorMessage.join(' '));
      } else {
        setError && setError(errors);
      }
      break;
    case 403:
      toastMessages.error('Bạn không có quyền, vui lòng quay lại!');
      break;
    default:
      toastMessages.error('Đã xảy ra lỗi, vui lòng thử lại!');
  }
};

export default errorHandling;

