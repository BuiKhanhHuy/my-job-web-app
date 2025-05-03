/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import React from 'react';
import { Controller } from 'react-hook-form';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

import { Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

const RichTextEditorCustom = ({
  control,
  name,
  title = '',
  showRequired = false,
}) => {
  return (
    <div>
      {title && (
        <Typography variant="subtitle2" gutterBottom>
          {title} {showRequired && <span style={{ color: 'red' }}>*</span>}
        </Typography>
      )}
      <Controller
        control={control}
        name={name}
        defaultValue={EditorState.createEmpty()}
        render={({ field, fieldState }) => (
          <>
            <Editor
              editorStyle={{
                header: {
                  marginBottom: '20px',
                  fontWeight: 'bold',
                  fontSize: '24px',
                  color: 'red',
                },
                border: '1px solid',
                borderColor: '#e0e0e0',
                marginTop: -1,
                minHeight: 200,
                borderBottomLeftRadius: 4,
                borderBottomRightRadius: 4,
              }}
              editorState={field.value}
              onEditorStateChange={field.onChange}
              toolbar={{
                options: ['inline', 'list', 'history'],
                inline: {
                  inDropdown: false,
                  className: undefined,
                  component: undefined,
                  dropdownClassName: undefined,
                  options: [
                    'bold',
                    'italic',
                    'underline',
                    'superscript',
                    'subscript',
                  ],
                },
                list: {
                  inDropdown: false,
                  className: undefined,
                  component: undefined,
                  dropdownClassName: undefined,
                  options: ['unordered', 'ordered', 'indent', 'outdent'],
                },
                history: {
                  inDropdown: false,
                  className: undefined,
                  component: undefined,
                  dropdownClassName: undefined,
                  options: ['undo', 'redo'],
                },
              }}
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

export default RichTextEditorCustom;
