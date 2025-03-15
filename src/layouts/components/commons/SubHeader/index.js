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

import { searchJobPost } from '../../../../redux/filterSlice';
import { ROUTES } from '../../../../configs/constants';

const listItems = (items, handleFilter) => (
  <Stack
    direction="row"
    spacing={4}
    alignContent="center"
    sx={{ overflow: 'hidden' }}
  >
    {items.map((item) => (
      <Typography
        variant="body2"
        key={item.id}
        sx={{
          fontWeight: 'bold',
          cursor: 'pointer',
          whiteSpace: 'nowrap',
        }}
       
        onClick={() => handleFilter(item.id)}
      >
      <span  style={{ color: '#451da0' }}>{item?.name}</span>  
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
            borderBottom: 0.8,
            borderColor: (theme) =>
              theme.palette.mode === 'light' ? '#e0e0e0' : '#441da0',
          }}
        >
          <Container maxWidth="xl">
            <Toolbar
              variant="dense"
              sx={{
                color: (theme) =>
                  theme.palette.mode === 'light' ? 'black' : 'white',
              }}
            >
              <Box
                sx={{ marginRight: 2, cursor: 'pointer' }}
                onClick={() => setOpen(true)}
              >
                <FontAwesomeIcon
                  icon={faListUl}
                  fontSize={24}
                  color="#441da0"
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
