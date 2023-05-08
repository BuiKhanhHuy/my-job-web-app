import React from 'react';
import { Chip, IconButton, TableBody, TableCell, Tooltip } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import dayjs from 'dayjs';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import DataTableCustom from '../../../../components/DataTableCustom';
import NoDataCard from '../../../../components/NoDataCard';

const JobPostsTable = (props) => {
  const { rows, isLoading, handleDelete, handleUpdate } = props;

  return (
    <DataTableCustom {...props}>
      {!isLoading && rows.length === 0 ? (
        <TableBody>
          <TableCell colSpan={7}>
            <NoDataCard title="Bạn chưa có tin tuyển dụng nào" />
          </TableCell>
        </TableBody>
      ) : (
        rows.map((row, index) => {
          return (
            <TableBody key={row.id}>
              <TableCell component="th" scope="row" padding="none">
                {row.jobName}{' '}
                {row.isUrgent && (
                  <Chip
                    label="Tuyển gấp"
                    color="error"
                    variant="outlined"
                    size="small"
                  />
                )}
              </TableCell>
              <TableCell align="left">
                {dayjs(row.createAt).format('DD/MM/YYYY')}
              </TableCell>
              <TableCell align="left">
                {new Date(dayjs(row.deadline).format('YYYY-MM-DD')).getDate() <
                new Date().getDate() ? (
                  <span style={{ color: 'red' }}>
                    {dayjs(row.deadline).format('DD/MM/YYYY')}
                  </span>
                ) : (
                  <span style={{ color: '#2a3eb1' }}>
                    {dayjs(row.deadline).format('DD/MM/YYYY')}
                  </span>
                )}
              </TableCell>
              <TableCell align="left">{row.appliedNumber}</TableCell>
              <TableCell align="left">{row.views}</TableCell>
              <TableCell align="left">
                {row.isVerify ? (
                  <Chip label="Đã duyệt" color="success" size="small" />
                ) : (
                  <Chip label="Chưa duyệt" color="warning" size="small" />
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
        })
      )}
    </DataTableCustom>
  );
};

export default JobPostsTable;
