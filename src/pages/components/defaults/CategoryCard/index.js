import React from 'react';
import { Grid, InputBase, Paper, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const CategoryCard = ({ options }) => {
  const [items, setItems] = React.useState(options);

  const handleFilterChange = (value) => {
    let filterItems = options.filter((option) =>
      option.name.toLowerCase().includes(value.toLowerCase())
    );
    setItems(filterItems);
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
          <Typography>{item.name}</Typography>
        </Grid>
      ))}
    </Grid>
  );
};

export default CategoryCard;
