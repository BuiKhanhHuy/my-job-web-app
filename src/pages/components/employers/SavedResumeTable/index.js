import React from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { Button, TableBody, TableCell } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

import DataTableCustom from '../../../../components/DataTableCustom';
import { salaryString } from '../../../../utils/customData';

const SavedResumeTable = (props) => {
  const { rows, handleUnsave } = props;
  const { allConfig } = useSelector((state) => state.config);

  return (
    <DataTableCustom {...props}>
      {rows.map((row, index) => {
        return (
          <TableBody key={row.id}>
            <TableCell component="th" scope="row" padding="none">
              {row?.resume?.title || (
                <span
                  style={{
                    color: '#9e9e9e',
                    fontStyle: 'italic',
                  }}
                >
                  Chưa cập nhật
                </span>
              )}{' '}
            </TableCell>
            <TableCell align="left">
              {row?.resume?.userDict?.fullName}
            </TableCell>
            <TableCell align="left">
              {salaryString(row?.resume?.salaryMin, row?.resume?.salaryMax) || (
                <span
                  style={{
                    color: '#9e9e9e',
                    fontStyle: 'italic',
                  }}
                >
                  Chưa cập nhật
                </span>
              )}
            </TableCell>
            <TableCell align="left">
              {allConfig?.experienceDict[row?.resume?.experience] || (
                <span
                  style={{
                    color: '#9e9e9e',
                    fontStyle: 'italic',
                  }}
                >
                  Chưa cập nhật
                </span>
              )}
            </TableCell>
            <TableCell align="left">
              {allConfig?.cityDict[row?.resume?.city] || (
                <span
                  style={{
                    color: '#9e9e9e',
                    fontStyle: 'italic',
                  }}
                >
                  Chưa cập nhật
                </span>
              )}
            </TableCell>
            <TableCell align="left">
              {dayjs(row?.createAt).format('DD/MM/YYYY')}
            </TableCell>
            <TableCell align="right">
              <Button
                size="small"
                variant="outlined"
                color="error"
                sx={{ textTransform: 'inherit' }}
                startIcon={<FavoriteIcon />}
                onClick={() => handleUnsave(row?.resume?.slug)}
              >
                Hủy lưu
              </Button>
            </TableCell>
          </TableBody>
        );
      })}
    </DataTableCustom>
  );
};

export default SavedResumeTable;
