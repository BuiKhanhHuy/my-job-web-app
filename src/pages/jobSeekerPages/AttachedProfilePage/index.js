/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

import React from "react";

import {
  Box,
  Card,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import PersonPinOutlinedIcon from "@mui/icons-material/PersonPinOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";

import { TabTitle } from "../../../utils/generalFunction";
import PersonalInfoCard from "../../components/jobSeekers/PersonalInfoCard";
import GeneralInfoCard from "../../components/jobSeekers/GeneralInfoCard";
import CVCard from "../../components/jobSeekers/CVCard";

const items = [
  { id: 0, value: "Thông tin cá nhân", icon: <PersonPinOutlinedIcon /> },
  { id: 1, value: "Thông tin chung", icon: <WorkOutlineOutlinedIcon /> },
  { id: 2, value: "Tải CV đính kèm", icon: <UploadFileOutlinedIcon /> },
];

const AttachedProfilePage = () => {
  TabTitle("Cập nhật hồ sơ Đính kèm");
  const refs = React.useRef([]);

  const handleClickScroll = (index) => {
    refs.current[index].scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <Box sx={{ py: 2, px: { xs: 2, sm: 3 } }}>
      <Grid container spacing={3}>
        <Grid xs={12} sm={12} md={7} lg={9} xl={9} item>
          <Stack spacing={3}>
            <Card 
              ref={(el) => (refs.current[0] = el)}
              sx={{
                '&:hover': {
                  boxShadow: (theme) => theme.customShadows.card,
                  borderColor: 'primary.main',
                  transition: 'all 0.3s ease'
                }
              }}
            >
              {/* Start: Personal info */}
              <PersonalInfoCard title="Thông tin cá nhân" />
              {/* End: Personal info  */}
            </Card>
            <Card ref={(el) => (refs.current[1] = el)}>
              {/* Start: General info */}
              <GeneralInfoCard title="Thông tin chung" />
              {/* End: General info */}
            </Card>
            <Card ref={(el) => (refs.current[2] = el)}>
              {/* Start: Cv card */}
              <CVCard title="Tải CV đính kèm" />
              {/* End: Cv card */}
            </Card>
          </Stack>
        </Grid>
        <Grid
          xs={12}
          sm={12}
          md={5}
          lg={3}
          xl={3}
          sx={{
            display: {
              xs: 'none',
              sm: 'none',
              md: 'block'
            }
          }}
          item
        >
          <Stack
            spacing={2}
            sx={{
              position: 'sticky',
              top: 80,
            }}
          >
            <Card 
              sx={{
                p: 3,
                background: (theme) => theme.palette.primary.gradient,
                color: 'white',
                border: 'none'
              }}
            >
              <Stack spacing={2}>
                <Typography 
                  variant="h6" 
                  sx={{
                    fontWeight: 600,
                    color: 'inherit'
                  }}
                >
                  Hồ sơ đính kèm của bạn
                </Typography>

                <List sx={{ width: '100%' }}>
                  {items.map((item) => (
                    <ListItem
                      key={item.id}
                      disablePadding
                      sx={{ mb: 1 }}
                    >
                      <ListItemButton
                        onClick={() => handleClickScroll(item.id)}
                        sx={{
                          borderRadius: 2,
                          '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          }
                        }}
                      >
                        <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText 
                          primary={item.value}
                          primaryTypographyProps={{
                            fontSize: '0.9rem',
                            fontWeight: 500
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Stack>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AttachedProfilePage;
