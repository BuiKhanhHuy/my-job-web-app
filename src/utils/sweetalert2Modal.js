import Swal from 'sweetalert2';

const confirmModal = (
  func,
  title = '',
  text = '',
  icon = 'success',
  showCancelButton = true,
  confirmButtonText = 'Đồng ý',
  cancelButtonText = 'Hủy'
) => {
  return Swal.fire({
    title: title,
    text: text,
    icon: icon,
    confirmButtonColor: '#441da0',
    showCancelButton: showCancelButton,
    confirmButtonText: confirmButtonText,
    cancelButtonText: cancelButtonText,
  }).then((result) => {
    if (result.isConfirmed) {
      func();
    }
  });
};

export { confirmModal };
