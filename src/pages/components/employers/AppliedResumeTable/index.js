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
import MarkEmailReadRoundedIcon from '@mui/icons-material/MarkEmailReadRounded';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import { CV_TYPES, ImageSvg13 } from '../../../../configs/constants';
import DataTableCustom from '../../../../components/DataTableCustom';
import { faFile, faFilePdf } from '@fortawesome/free-regular-svg-icons';
import NoDataCard from '../../../../components/NoDataCard';
import { convertEditorStateToHTMLString } from '../../../../utils/customData';
import SendMailCard from '../SendMailCard';
import BackdropLoading from '../../../../components/loading/BackdropLoading';
import jobPostActivityService from '../../../../services/jobPostActivityService';
import toastMessages from '../../../../utils/toastMessages';
import errorHandling from '../../../../utils/errorHandling';

const SendEmailComponent = ({
  jobPostActivityId,
  isSentEmail,
  email,
  fullName,
}) => {
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);
  const [openSendMailPopup, setOpenSendMailPopup] = React.useState(false);
  const [sendMailData, setSendMailData] = React.useState(null);
  const [sentEmail, setSentEmail] = React.useState(isSentEmail);

  const handleOpenSendMail = (email, fullName) => {
    setSendMailData({
      fullName: fullName,
      email: email,
    });
    setOpenSendMailPopup(true);
  };

  const handleSendEmail = (data) => {
    const sendEmail = async (id, data) => {
      setIsFullScreenLoading(true);
      try {
        await jobPostActivityService.sendEmail(id, data);

        if (!sentEmail) {
          setSentEmail(true);
        }
        setOpenSendMailPopup(false);
        toastMessages.success('Gửi email thành công.');
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    let newData = {
      ...data,
      content: convertEditorStateToHTMLString(data.content),
    };
    // execute
    sendEmail(jobPostActivityId, newData);
  };

  return (
    <>
      <Button
        variant="contained"
        size="small"
        color="secondary"
        sx={{ textTransform: 'inherit', width: 110 }}
        startIcon={
          sentEmail ? <MarkEmailReadRoundedIcon /> : <ForwardToInboxIcon />
        }
        onClick={() => handleOpenSendMail(email, fullName)}
      >
        {sentEmail ? 'Gửi lại' : 'Gửi email'}
      </Button>
      {/* Start: send mail */}
      <SendMailCard
        openPopup={openSendMailPopup}
        setOpenPopup={setOpenSendMailPopup}
        sendMailData={sendMailData}
        handleSendEmail={handleSendEmail}
      />
      {/* Start:  send mail */}
      {/* Start: full screen loading */}
      {isFullScreenLoading && <BackdropLoading />}
      {/* End: full screen loading */}
    </>
  );
};

const AppliedResumeTable = (props) => {
  const nav = useNavigate();
  const { rows, isLoading, handleChangeApplicationStatus, handleDelete } =
    props;
  const { allConfig } = useSelector((state) => state.config);

  return (
    <DataTableCustom {...props}>
      {!isLoading && rows.length === 0 ? (
        <TableBody>
          <TableCell colSpan={7}>
            <NoDataCard
              title="Chưa có ứng viên ứng tuyển"
              imgComponentSgv={<ImageSvg13 />}
            />
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
                {row?.type === CV_TYPES.cvWebsite ? (
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
                      color: '#e0e0e0',
                      fontStyle: 'italic',
                      fontSize: 13,
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
                {row?.type === CV_TYPES.cvWebsite
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
                    <IconButton
                      color="primary"
                      aria-label="view"
                      size="small"
                      onClick={() =>
                        nav(
                          `/nha-tuyen-dung/chi-tiet-ung-vien/${row?.resumeSlug}`
                        )
                      }
                    >
                      <RemoveRedEyeOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Xóa hồ sơ" arrow>
                    <IconButton
                      size="small"
                      color="error"
                      aria-label="delete"
                      onClick={() => handleDelete(row?.id)}
                    >
                      <DeleteOutlineOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <SendEmailComponent
                    jobPostActivityId={row.id}
                    isSentEmail={row?.isSentEmail}
                    email={row?.email}
                    fullName={row?.fullName}
                  />
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
