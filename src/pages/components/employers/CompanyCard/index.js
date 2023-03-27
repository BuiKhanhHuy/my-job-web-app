import React from 'react';
import { Box, Button, Stack } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

import toastMessages from '../../../../utils/toastMessages';
import errorHandling from '../../../../utils/errorHandling';
import BackdropLoading from '../../../../components/loading/BackdropLoading';
import CompanyForm from '../CompanyForm';
import companyService from '../../../../services/companyService';

const CompanyCard = ({ title }) => {
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isLoadingCompany, setIsLoadingCompany] = React.useState(true);
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);
  const [editData, setEditData] = React.useState(null);
  const [serverErrors, setServerErrors] = React.useState(null);

  React.useEffect(() => {
    const loadCompany = async () => {
      setIsLoadingCompany(true);
      try {
        const resData = await companyService.getCompany();

        setEditData(resData.data);
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsLoadingCompany(false);
      }
    };

    loadCompany();
  }, [isSuccess]);

  const handleUpdate = (data) => {
    const update = async (id, data) => {
      setIsFullScreenLoading(true);

      try {
        await companyService.updateCompany(id, data);

        setIsSuccess(!isSuccess);
        if (serverErrors !== null) setServerErrors(null);
        toastMessages.success('Cập nhật thông tin công ty thành công.');
      } catch (error) {
        errorHandling(error, setServerErrors);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    update(data.id, data);
  };

  return (
    <>
      <Stack>
        <Box>
          {isLoadingCompany ? (
            <CompanyForm.Loading />
          ) : (
            <>
              {/* Start: company form */}
              <CompanyForm
                handleUpdate={handleUpdate}
                editData={editData}
                serverErrors={serverErrors}
              />
              {/* End: company form */}
              <Box sx={{ mt: 3 }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<SaveOutlinedIcon />}
                  type="submit"
                  form="company-form"
                >
                  Cập nhật
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Stack>

      {/* Start: full screen loading */}
      {isFullScreenLoading && <BackdropLoading />}
      {/* End: full screen loading */}
    </>
  );
};

export default CompanyCard;
