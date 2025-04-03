import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Stack, Tooltip, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import dayjs from "dayjs";
import { List, Avatar as AntAvatar } from "antd";
import { FileOutlined, FilePdfOutlined } from "@ant-design/icons";

import jobSeekerProfileService from "../../../../services/jobSeekerProfileService";
import { CV_TYPES, ROUTES } from "../../../../configs/constants";

const JobApplicationCard = () => {
  const nav = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const getOnlineProfile = async (jobSeekerProfileId, params) => {
      setIsLoading(true);
      try {
        const resData = await jobSeekerProfileService.getResumes(
          jobSeekerProfileId,
          params
        );

        setData(resData.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getOnlineProfile(currentUser?.jobSeekerProfileId);
  }, [currentUser]);

  return (
    <Box
      sx={{
        background: "#fff",
        borderRadius: 2,
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Hồ sơ xin việc
        </Typography>
        <IconButton
          aria-label="ArrowForward"
          size="medium"
          onClick={() =>
            nav(`/${ROUTES.JOB_SEEKER.DASHBOARD}/${ROUTES.JOB_SEEKER.PROFILE}`)
          }
          sx={{
            "&:hover": {
              backgroundColor: (theme) => theme.palette.primary.background,
              color: (theme) => theme.palette.primary.main,
            },
          }}
        >
          <ArrowForwardIcon />
        </IconButton>
      </Stack>

      <Box>
        <List
          itemLayout="horizontal"
          dataSource={data}
          loading={isLoading}
          renderItem={(item, index) => (
            <List.Item
              style={{
                padding: "16px",
                marginBottom: "8px",
                background: (theme) => theme.palette.grey[50],
                borderRadius: "12px",
                cursor: "pointer",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: (theme) => theme.customShadows.small,
                },
              }}
            >
              <List.Item.Meta
                avatar={
                  item?.type === CV_TYPES.cvWebsite ? (
                    <Tooltip title="Hồ sơ Online">
                      <AntAvatar
                        style={{
                          backgroundColor: (theme) =>
                            theme.palette.primary.main,
                          padding: "6px",
                          width: "45px",
                          height: "45px",
                        }}
                        icon={<FileOutlined />}
                      />
                    </Tooltip>
                  ) : item?.type === CV_TYPES.cvUpload ? (
                    <Tooltip title="Hồ sơ đính kèm">
                      <AntAvatar
                        style={{
                          backgroundColor: (theme) => theme.palette.hot.main,
                          padding: "6px",
                          width: "45px",
                          height: "45px",
                        }}
                        icon={<FilePdfOutlined />}
                      />
                    </Tooltip>
                  ) : (
                    "---"
                  )
                }
                title={
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 500,
                      color: (theme) => theme.palette.text.primary,
                    }}
                  >
                    {item?.title}
                  </Typography>
                }
                description={
                  <Stack spacing={0.5}>
                    <Typography
                      variant="caption"
                      sx={{
                        color: (theme) => theme.palette.text.secondary,
                      }}
                    >
                      Sửa lần cuối {dayjs(item?.updateAt).format("DD/MM/YYYY")}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: item?.isActive
                          ? (theme) => theme.palette.success.main
                          : (theme) => theme.palette.hot.main,
                        fontWeight: 500,
                      }}
                    >
                      {item?.isActive
                        ? "Đang cho phép tìm kiếm"
                        : "Không cho phép tìm kiếm"}
                    </Typography>
                  </Stack>
                }
              />
            </List.Item>
          )}
        />
      </Box>
    </Box>
  );
};

export default JobApplicationCard;
