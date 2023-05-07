import React from 'react';
import { Controller } from 'react-hook-form';
import { Checkbox, FormControlLabel } from '@mui/material';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

const CheckboxCustom = ({ name, control, title = '', disabled = false }) => {
  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <>
            <FormControlLabel
              control={
                <Checkbox checked={Boolean(field.value)} value={true} onChange={field.onChange} />
              }
              label={title}
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

export default CheckboxCustom;
