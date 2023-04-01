import React from 'react';

import FormPopup from '../controls/FormPopup';
import ApplyForm from '../ApplyForm';
import { Typography } from '@mui/material';

const ApplyCard = ({ title = '', openPopup, setOpenPopup }) => {
  const handleApply = (data) => {
    console.log("APPLY: ", data)
  };

  return (
    <FormPopup
      title={
        <>
          <Typography color="gray">Ứng tuyển vị trí </Typography>
          <span>{title}</span>
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
