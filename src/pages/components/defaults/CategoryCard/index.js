import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, InputBase, Paper, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { searchJobPost } from '../../../../redux/filterSlice';
import { ROUTES } from '../../../../configs/constants';

const CategoryCard = ({ options, type }) => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { jobPostFilter } = useSelector((state) => state.filter);
  const [items, setItems] = React.useState(options);

  const handleFilterChange = (value) => {
    let filterItems = options.filter((option) =>
      option.name.toLowerCase().includes(value.toLowerCase())
    );
    setItems(filterItems);
  };

  const handleFilter = (id) => {
    switch (type) {
      case 'CARRER':
        dispatch(searchJobPost({ ...jobPostFilter, careerId: id }));
        break;
      case 'CITY':
        dispatch(searchJobPost({ ...jobPostFilter, cityId: id }));
        break;
      case 'JOB_TYPE':
        dispatch(searchJobPost({ ...jobPostFilter, jobTypeId: id }));
        break;
      default:
        break;
    }
    nav(`/${ROUTES.JOB_SEEKER.JOBS}`);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper
          component="form"
          sx={{
            boxShadow: 0,
            p: '2px 5px',
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            backgroundColor: 'white',
            border: 1,
            borderColor: '#441da0',
            maxWidth: {
              xs: '100%',
              sm: '60%',
              md: '30%',
              lg: '30%',
              xl: '30%',
            },
            mb: 1,
          }}
        >
          <SearchIcon color="disabled" />
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            inputProps={{ 'aria-label': 'search' }}
            defaultValue=""
            placeholder="Tìm kiếm nhanh"
            onChange={(event) => handleFilterChange(event.target.value)}
          />
        </Paper>
      </Grid>
      {items.map((item) => (
        <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={item.id}>
          <Typography
            sx={{
              cursor: 'pointer',
              '&:hover': {
                color: '#fca34d',
                fontWeight: 'bold',
              },
            }}
            onClick={() => handleFilter(item.id)}
          >
            {item.name}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
};

export default CategoryCard;
