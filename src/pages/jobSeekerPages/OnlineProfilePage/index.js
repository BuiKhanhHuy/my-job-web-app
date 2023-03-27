import React from 'react';

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
} from '@mui/material';
import PersonPinOutlinedIcon from '@mui/icons-material/PersonPinOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import ThumbsUpDownOutlinedIcon from '@mui/icons-material/ThumbsUpDownOutlined';
import TranslateOutlinedIcon from '@mui/icons-material/TranslateOutlined';
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';

import PersonalInfoCard from '../../components/jobSeekers/PersonalInfoCard';
import GeneralInfoCard from '../../components/jobSeekers/GeneralInfoCard';
import ExperienceDetailCard from '../../components/jobSeekers/ExperienceDetailCard';
import EducationDetailCard from '../../components/jobSeekers/EducationDetailCard';
import CertificateCard from '../../components/jobSeekers/CertificateCard';
import LanguageSkillCard from '../../components/jobSeekers/LanguageSkillCard';
import AdvancedSkillCard from '../../components/jobSeekers/AdvancedSkillCard';

const items = [
  { id: 0, value: 'Thông tin chung', icon: <PersonPinOutlinedIcon /> },
  { id: 1, value: 'Thông tin hồ sơ', icon: <WorkOutlineOutlinedIcon /> },
  { id: 2, value: 'Kinh nghiệm làm việc', icon: <ReceiptLongOutlinedIcon /> },
  { id: 3, value: 'Thông tin học vấn', icon: <SchoolOutlinedIcon /> },
  { id: 4, value: 'Chứng chỉ', icon: <ThumbsUpDownOutlinedIcon /> },
  { id: 5, value: 'Kỹ năng ngôn ngữ', icon: <TranslateOutlinedIcon /> },
  { id: 6, value: 'Kỹ năng chuyên môn', icon: <AutoFixHighOutlinedIcon /> },
];

const OnlineProfilePage = () => {
  const refs = React.useRef([]);

  const handleClickScroll = (index) => {
    refs.current[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid xs={12} sm={12} md={7} lg={9} xl={9} item>
          <Stack spacing={2}>
            <Card sx={{ p: 2 }} ref={(el) => (refs.current[0] = el)}>
              {/* Start: Personal info */}
              <PersonalInfoCard title="Thông tin cá nhân" />
              {/* End: Personal info  */}
            </Card>
            <Card sx={{ p: 2 }} ref={(el) => (refs.current[1] = el)}>
              {/* Start: General info */}
              <GeneralInfoCard title="Thông tin chung" />
              {/* End: General info */}
            </Card>
            <Card sx={{ p: 2 }} ref={(el) => (refs.current[2] = el)}>
              {/* Start: Experience detail */}
              <ExperienceDetailCard title="Kinh nghiệm làm việc" />
              {/* End: Experience detail */}
            </Card>
            <Card sx={{ p: 2 }} ref={(el) => (refs.current[3] = el)}>
              {/* Start: Education detail */}
              <EducationDetailCard title="Thông tin học vấn" />
              {/* End: Education detail */}
            </Card>
            <Card sx={{ p: 2 }} ref={(el) => (refs.current[4] = el)}>
              {/* Start: Appreciation */}
              <CertificateCard title="Chứng chỉ" />
              {/* End: Appreciation */}
            </Card>
            <Card sx={{ p: 2 }} ref={(el) => (refs.current[5] = el)}>
              {/* Start: Language Skills */}
              <LanguageSkillCard title="Kỹ năng ngôn ngữ" />
              {/* End: Language Skills */}
            </Card>
            <Card sx={{ p: 2 }} ref={(el) => (refs.current[6] = el)}>
              {/* Start: Advanced Skills */}
              <AdvancedSkillCard title="Kỹ năng chuyên môn" />
              {/* End: Advanced Skills */}
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
              md: 'block',
              lg: 'block',
              xl: 'block',
            },
          }}
          item
        >
          <Stack spacing={2}>
            <Card sx={{ p: 2 }}>
              <Stack>
                <Box>
                  <Typography variant="h6">Hồ sơ trực tuyến của bạn</Typography>
                </Box>
                <Box>
                  <List
                    sx={{
                      width: '100%',
                      bgcolor: 'background.paper',
                    }}
                    aria-label="contacts"
                  >
                    {items.map((item) => (
                      <ListItem
                        key={item.id}
                        disablePadding
                        onClick={() => handleClickScroll(item.id)}
                      >
                        <ListItemButton>
                          <ListItemIcon>{item.icon}</ListItemIcon>
                          <ListItemText primary={item.value} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Stack>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OnlineProfilePage;
