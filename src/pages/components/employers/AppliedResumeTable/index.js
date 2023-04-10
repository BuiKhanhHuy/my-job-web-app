import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import {
  MenuItem,
  TableBody,
  TableCell,
  TextField,
  Tooltip,
  Typography,
  Button,
  IconButton,
  Stack,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

import DataTableCustom from '../../../../components/DataTableCustom';
import { faFile, faFilePdf } from '@fortawesome/free-regular-svg-icons';
import { CV_TYPES } from '../../../../configs/constants';
import NoDataCard from '../../../../components/NoDataCard';

const AppliedResumeTable = (props) => {
  const nav = useNavigate();
  const { rows, isLoading, handleChangeApplicationStatus, handleSendMail } =
    props;
  const { allConfig } = useSelector((state) => state.config);

  return (
    <DataTableCustom {...props}>
      {!isLoading && rows.length === 0 ? (
        <TableBody>
          <TableCell colSpan={7}>
            <NoDataCard title="Chưa có ứng viên ứng tuyển" />
          </TableCell>
        </TableBody>
      ) : (
        rows.map((row, index) => {
          return (
            <TableBody key={row.id}>
              <TableCell component="th" scope="row" padding="none">
                <Typography sx={{ fontWeight: 'bold' }}>
                  {row?.fullName}
                </Typography>
                {row?.resume?.type === CV_TYPES.cvWebsite ? (
                  <Tooltip title="Hồ sơ Online" arrow>
                    <FontAwesomeIcon
                      icon={faFile}
                      style={{ marginRight: 1 }}
                      color="#441da0"
                    />
                  </Tooltip>
                ) : (
                  <Tooltip title="Hồ sơ Đính kèm" arrow>
                    <FontAwesomeIcon
                      icon={faFilePdf}
                      style={{ marginRight: 1 }}
                      color="red"
                    />
                  </Tooltip>
                )}{' '}
                {row?.title || (
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
              <TableCell align="left">{row?.jobName}</TableCell>
              <TableCell align="left">
                {dayjs(row?.createAt).format('DD/MM/YYYY')}
              </TableCell>
              <TableCell align="left">
                {row?.resume?.type === CV_TYPES.cvWebsite
                  ? 'Hồ sơ Online'
                  : 'Hồ sơ đính kèm'}
              </TableCell>
              <TableCell align="right">
                <TextField
                  id="jobPostActivityStatus"
                  size="small"
                  fullWidth
                  select
                  defaultValue={row?.status}
                  onChange={(e) =>
                    handleChangeApplicationStatus(row.id, e.target.value)
                  }
                >
                  {(allConfig?.applicationStatusOptions || []).map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              </TableCell>
              <TableCell align="right">
                <Stack direction="row" spacing={1} justifyContent="flex-end">
                  <Tooltip title="Xem hồ sơ" arrow>
                    <IconButton aria-label="view" size="small">
                      <RemoveRedEyeOutlinedIcon
                        fontSize="small"
                        color="primary"
                        onClick={() =>
                          nav(
                            `/nha-tuyen-dung/chi-tiet-ung-vien/${row?.resumeSlug}`
                          )
                        }
                      />
                    </IconButton>
                  </Tooltip>
                  <Button
                    variant="contained"
                    size="small"
                    color="secondary"
                    sx={{ textTransform: 'inherit' }}
                    startIcon={<ForwardToInboxIcon />}
                    onClick={() => handleSendMail(row?.email, row?.fullName)}
                  >
                    Gửi mail
                  </Button>
                </Stack>
              </TableCell>
            </TableBody>
          );
        })
      )}
    </DataTableCustom>
  );
};

export default AppliedResumeTable;
