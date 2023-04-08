import React from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { Button,TableBody, TableCell, Tooltip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import NoDataCard from '../../../../components/NoDataCard';
import DataTableCustom from '../../../../components/DataTableCustom';
import { salaryString } from '../../../../utils/customData';
import { faFile, faFilePdf } from '@fortawesome/free-regular-svg-icons';
import { CV_TYPES } from '../../../../configs/constants';

const SavedResumeTable = (props) => {
  const { rows, isLoading, handleUnsave } = props;
  const { allConfig } = useSelector((state) => state.config);

  return (
    <DataTableCustom {...props}>
      {!isLoading && rows.length === 0 ? (
        <TableBody>
          <TableCell colSpan={7}>
            <NoDataCard title="Bạn chưa lưu ứng viên nào" />
          </TableCell>
        </TableBody>
      ) : (
        rows.map((row, index) => {
          return (
            <TableBody key={row.id}>
              <TableCell component="th" scope="row" padding="none">
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
                {salaryString(
                  row?.resume?.salaryMin,
                  row?.resume?.salaryMax
                ) || (
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
        })
      )}
    </DataTableCustom>
  );
};

export default SavedResumeTable;
