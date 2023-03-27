import React from 'react';
import { Controller } from 'react-hook-form';
import { Rating, Typography } from '@mui/material';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

const RatingCustom = ({ name, control, title = null }) => {
  return (
    <div>
      {title && (
        <Typography variant="subtitle2" gutterBottom>
          {title}
        </Typography>
      )}
      <Controller
        defaultValue={3}
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <>
            <Rating
              size="large"
              value={field.value}
              onChange={field.onChange}
            />
            {fieldState.invalid && (
              <span
                style={{
                  color: 'red',
                  fontSize: 13,
                  marginTop: 1,
                  marginLeft: 1,
                }}
              >
                <FontAwesomeIcon icon={faCircleExclamation} />{' '}
                {fieldState.error?.message}
              </span>
            )}
          </>
        )}
      />
    </div>
  );
};

export default RatingCustom;
