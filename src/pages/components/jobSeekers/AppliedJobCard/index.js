import React from 'react';
import {
  Button,
  Divider,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import NoDataCard from '../../../../components/NoDataCard';

const AppliedJobCard = () => {
  const [page, setPage] = React.useState(0);
  const [isLoadingJobPost, setIsLoadingJobPost] = React.useState(false);
  const [jobPosts, setJobPosts] = React.useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      {/* <Stack
        direction="row"
        justifyContent="flex-end"
        sx={{ mb: 3 }}
        spacing={2}
      >
        <Button variant="outlined" color="secondary">
          Tải danh sách
        </Button>
      </Stack> */}
      <Divider />
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Tên việc làm</TableCell>
              <TableCell align="right">Hồ sơ ứng tuyển</TableCell>
              <TableCell align="right">Ngày nộp</TableCell>
              <TableCell align="right">Thời hạn nộp</TableCell>
              <TableCell align="right">Trạng thái</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoadingJobPost ? (
              <h1>Loading</h1>
            ) : jobPosts.length === 0 ? (
              <NoDataCard />
            ) : (
              <h1>data</h1>
            )}
            {/* {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))} */}
          </TableBody>
        </Table>
        <Stack sx={{ mt: 3 }}>
          <Pagination
            count={10}
            page={page}
            onChange={handleChangePage}
            variant="outlined"
            color="primary"
            sx={{ margin: '0 auto' }}
          />
        </Stack>
      </TableContainer>
    </>
  );
};

export default AppliedJobCard;
