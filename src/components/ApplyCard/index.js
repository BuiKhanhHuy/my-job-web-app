import React from 'react';

import FormPopup from '../controls/FormPopup';
import ApplyForm from '../ApplyForm';

const ApplyCard = ({ title = '', openPopup, setOpenPopup }) => {
  const handleApply = (data) => {};

  return (
    <FormPopup
      title={
        <>
          Ứng tuyển vị trí{' '}
          <span style={{ color: '#fca34d' }}>{title}</span>
        </>
      }
      openPopup={openPopup}
      setOpenPopup={setOpenPopup}
    >
      <ApplyForm handleApply={handleApply} />
    </FormPopup>
  );
};

export default ApplyCard;
