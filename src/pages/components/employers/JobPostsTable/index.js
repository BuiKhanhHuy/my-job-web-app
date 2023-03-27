import React from 'react';
import { Chip, IconButton, TableBody, TableCell, Tooltip } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import dayjs from 'dayjs';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import DataTableCustom from '../../../../components/DataTableCustom';

const JobPostsTable = (props) => {
  const { rows, handleDelete, handleUpdate } = props;

  return (
    <DataTableCustom {...props}>
      {rows.map((row, index) => {
        return (
          <TableBody key={row.id}>
            <TableCell component="th" scope="row" padding="none">
              {row.jobName}
            </TableCell>
            <TableCell align="left">
              {dayjs(row.createAt).format('DD/MM/YYYY')}
            </TableCell>
            <TableCell align="left">
              {dayjs(row.deadline).format('DD/MM/YYYY')}
            </TableCell>
            <TableCell align="left">{row.appliedNumber}</TableCell>
            <TableCell align="left">
              {row.isUrgent ? (
                <Chip label="Tuyển gấp" color="error" />
              ) : (
                <Chip label="Đang tuyển" color="info" />
              )}
            </TableCell>
            <TableCell align="right">
              <Tooltip title="Cập nhật" arrow>
                <IconButton
                  color="secondary"
                  aria-label="edit"
                  onClick={() => handleUpdate(row.id)}
                >
                  <EditOutlinedIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Xóa" arrow>
                <IconButton
                  color="error"
                  aria-label="delete"
                  onClick={() => handleDelete(row.id)}
                >
                  <DeleteOutlineOutlinedIcon />
                </IconButton>
              </Tooltip>
            </TableCell>
          </TableBody>
        );
      })}
    </DataTableCustom>
  );
};

export default JobPostsTable;
