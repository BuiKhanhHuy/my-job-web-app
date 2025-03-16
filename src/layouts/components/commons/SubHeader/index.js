import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Stack } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListUl } from '@fortawesome/free-solid-svg-icons';
import SubHeaderDialog from '../SubHeaderDialog';
import commonService from '../../../../services/commonService';
import { useTheme } from '@mui/material/styles';

import { searchJobPost } from '../../../../redux/filterSlice';
import { ROUTES } from '../../../../configs/constants';

const listItems = (items, handleFilter) => (
  <Stack
    direction="row"
    spacing={2}
    alignContent="center"
    sx={{ 
      overflow: 'hidden',
      '& .MuiTypography-root:hover': {
        transform: 'translateY(-2px)',
        transition: 'transform 0.2s ease-in-out'
      }
    }}
  >
    {items.map((item) => (
      <Typography
        variant="body2"
        key={item.id}
        sx={{
          fontWeight: 600,
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          padding: '6px 12px',
          borderRadius: '16px',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            backgroundColor: (theme) => theme.palette.primary.background,
            color: (theme) => theme.palette.primary.main,
          }
        }}
        onClick={() => handleFilter(item.id)}
      >
        {item?.name}
      </Typography>
    ))}
  </Stack>
);

const SubHeader = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { jobPostFilter } = useSelector((state) => state.filter);
  const [open, setOpen] = React.useState(false);
  const [topCareers, setTopCareers] = React.useState([]);
  const theme = useTheme();

  React.useEffect(() => {
    const getTopCarreers = async () => {
      try {
        const resData = await commonService.getTop10Careers();

        setTopCareers(resData.data);
      } catch (error) {
      } finally {
      }
    };

    getTopCarreers();
  }, []);

  const handleFilter = (id) => {
    dispatch(searchJobPost({ ...jobPostFilter, careerId: id }));

    nav(`/${ROUTES.JOB_SEEKER.JOBS}`);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{
            bgcolor: (theme) =>
              theme.palette.mode === 'light' ? 'white' : 'black',
            boxShadow: 0,
            borderBottom: 1,
            borderColor: (theme) =>
              theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.primary.dark,
          }}
        >
          <Container maxWidth="xl">
            <Toolbar
              variant="dense"
              sx={{
                color: (theme) =>
                  theme.palette.mode === 'light' ? 'black' : 'white',
                py: 0.5,
                gap: 1
              }}
            >
              <Box
                sx={{ 
                  cursor: 'pointer',
                  width: 40,
                  height: 40,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '12px',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    backgroundColor: theme.palette.primary.background,
                    transform: 'scale(1.05)'
                  }
                }}
                onClick={() => setOpen(true)}
              >
                <FontAwesomeIcon
                  icon={faListUl}
                  fontSize={20}
                  style={{ 
                    color: theme.palette.primary.main
                  }}
                />
              </Box>
              {listItems(topCareers, handleFilter)}
            </Toolbar>
          </Container>
        </AppBar>
      </Box>

      {/* Start: Subheader Dialog */}
      <SubHeaderDialog
        open={open}
        setOpen={setOpen}
        topCareers={topCareers}
        handleFilter={handleFilter}
      />
      {/* End: Subheader Dialog */}
    </>
  );
};

export default SubHeader;
