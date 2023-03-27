import * as React from 'react';
import { Container, Stack } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListUl } from '@fortawesome/free-solid-svg-icons';
import SubHeaderDialog from '../SubHeaderDialog';

const listItems = () => (
  <Stack
    direction="row"
    spacing={4}
    alignContent="center"
    sx={{ overflow: 'hidden' }}
  >
    <Typography
      variant="body2"
      sx={{
        fontWeight: 'bold',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
      }}
    >
      Bán buôn - Bán lẻ - Quản lý cửa hàng
    </Typography>
    <Typography
      variant="body2"
      sx={{
        fontWeight: 'bold',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
      }}
    >
      Kinh doanh
    </Typography>
    <Typography
      variant="body2"
      sx={{
        fontWeight: 'bold',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
      }}
    >
      Marketing
    </Typography>
    <Typography
      variant="body2"
      sx={{
        fontWeight: 'bold',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
      }}
    >
      Khoa học - Kỹ thuật
    </Typography>
    <Typography
      variant="body2"
      sx={{
        fontWeight: 'bold',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
      }}
    >
      Hành chính - Thư ký
    </Typography>
    <Typography
      variant="body2"
      sx={{
        fontWeight: 'bold',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
      }}
    >
      Kế toán
    </Typography>
    <Typography
      variant="body2"
      sx={{
        fontWeight: 'bold',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
      }}
    >
      Ngành nghề khác
    </Typography>
  </Stack>
);

const SubHeader = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{
            bgcolor: 'white',
            boxShadow: 0,
            borderBottom: 0.8,
            borderColor: '#e0e0e0',
          }}
        >
          <Container maxWidth="xl">
            <Toolbar variant="dense" sx={{ color: 'black' }}>
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
              {listItems()}
            </Toolbar>
          </Container>
        </AppBar>
      </Box>

      {/* Start: Subheader Dialog */}
      <SubHeaderDialog open={open} setOpen={setOpen} />
      {/* End: Subheader Dialog */}
    </>
  );
};

export default SubHeader;
