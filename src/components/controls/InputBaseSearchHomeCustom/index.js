import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import Tippy from '@tippyjs/react';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { Controller } from 'react-hook-form';
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { IconButton, InputAdornment } from '@mui/material';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';

import { useDebounce } from '../../../hooks';
import { searchJobPostWithKeyword } from '../../../redux/filterSlice';
import jobService from '../../../services/jobService';
import { Spin } from 'antd';
import { ROUTES } from '../../../configs/constants';

const InputBaseSearchHomeCustom = ({
  name,
  control,
  placeholder,
  showSubmitButton = false,
  location = 'HOME',
}) => {
  const theme = useTheme();
  const inputRef = React.useRef();
  const inputSearchRef = React.useRef();
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [showResult, setShowResult] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const [searchResult, setSearchResult] = React.useState([]);
  const [recentSearch, setRecentSearch] = React.useState([]);
  const debounded = useDebounce(searchValue, 300);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    try {
      const keywordListStr = localStorage.getItem('myjob_search_history');
      if (
        keywordListStr !== null ||
        keywordListStr !== undefined ||
        keywordListStr !== ''
      ) {
        setRecentSearch(JSON.parse(keywordListStr));
      }
    } catch (error) {
      console.error('Loi khi lay tu khoa tu local storage: ', error);
    }
  }, []);

  React.useEffect(() => {
    if (!debounded.trim()) {
      setSearchResult([]);
      return;
    }

    const getSuggestTitle = async (kw) => {
      if (!isLoading) {
        setIsLoading(true);
      }

      try {
        const resData = await jobService.searchJobSuggestTitle(kw);
        const data = resData?.data;

        setSearchResult(data.flat());
      } catch (error) {
        console.error('Search failed: ', error);
      } finally {
        setIsLoading(false);
      }
    };

    getSuggestTitle(debounded);
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounded]);

  const handleHideResult = () => {
    setShowResult(!showResult);
  };

  const handleClickItem = (kw) => {
    dispatch(searchJobPostWithKeyword({ kw: kw }));
    switch (location) {
      case 'HOME':
        nav(`/${ROUTES.JOB_SEEKER.JOBS}`);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Tippy
        placement="bottom"
        interactive={true}
        visible={showResult}
        onClickOutside={handleHideResult}
        render={(attrs) => (
          <Box
            {...attrs}
            sx={{
              display: showResult ? 'block' : 'none',
              backgroundColor: 'white',
              py: 2,
              px: 2,
              width: inputSearchRef.current?.offsetWidth,
              boxShadow: 4,
              borderRadius: 1,
              maxHeight: '60vh',
              overflowY: 'auto',
            }}
          >
            <Stack>
              <Box>
                <Typography fontWeight="bold" fontSize={17} color="#2C95FF">
                  Gợi ý tìm kiếm
                </Typography>
                <Stack>
                  {isLoading ? (
                    <Stack sx={{ py: 2 }} justifyContent="center">
                      <Spin />
                    </Stack>
                  ) : searchResult.length === 0 ? (
                    <Typography
                      my={1}
                      textAlign="center"
                      color={'#bdbdbd'}
                      variant="caption"
                    >
                      Không có dữ liệu
                    </Typography>
                  ) : (
                    <List>
                      {searchResult.map((value) => (
                        <ListItem
                          sx={{
                            '&:hover': {
                              backgroundColor: '#E9F4FF',
                            },
                            cursor: 'pointer',
                            borderRadius: 1,
                            px: 0.5,
                          }}
                          onClick={() => handleClickItem(value)}
                        >
                          <ListItemIcon
                            sx={{
                              minWidth: 0,
                              mr: 1,
                            }}
                          >
                            <LightbulbOutlinedIcon sx={{ color: '#FCC67B' }} />
                          </ListItemIcon>
                          <ListItemText primary={`${value}`} secondary={null} />
                        </ListItem>
                      ))}
                    </List>
                  )}
                </Stack>
              </Box>
              {(recentSearch || [])?.length > 0 && (
                <Box>
                  <Typography fontWeight="bold" fontSize={17} color="#2C95FF">
                    Tìm kiếm gần đây
                  </Typography>
                  <Stack>
                    <List>
                      {recentSearch.map((value, index) => (
                        <ListItem
                          key={index}
                          sx={{
                            '&:hover': {
                              backgroundColor: '#E9F4FF',
                            },
                            cursor: 'pointer',
                            borderRadius: 1,
                            px: 0.5,
                          }}
                          onClick={() => handleClickItem(value)}
                        >
                          <ListItemIcon
                            sx={{
                              minWidth: 0,
                              mr: 1,
                            }}
                          >
                            <QueryBuilderIcon sx={{ color: '#2C95FF' }} />
                          </ListItemIcon>
                          <ListItemText primary={`${value}`} secondary={null} />
                        </ListItem>
                      ))}
                    </List>
                  </Stack>
                </Box>
              )}
            </Stack>
          </Box>
        )}
      >
        <Box
          ref={inputSearchRef}
          sx={{
            boxShadow: 0,
            borderRadius: 1,
            p: '3.5px 4px',
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            backgroundColor:
              theme.palette.mode === 'light' ? 'white' : '#121212',
          }}
        >
          <SearchIcon color="disabled" />
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <InputBase
                inputRef={inputRef}
                id={field.name}
                sx={{ ml: 1, flex: 1 }}
                placeholder={placeholder}
                inputProps={{ 'aria-label': 'search' }}
                defaultValue=""
                value={field.value}
                onFocus={() => setShowResult(true)}
                onChange={(e) => {
                  const textValue = e.target.value;

                  field.onChange(textValue);
                  setSearchResult([]);
                  setSearchValue(textValue);
                  if (!isLoading) {
                    setIsLoading(true);
                  }
                }}
                onBlur={field.onBlur}
                endAdornment={
                  <InputAdornment
                    position="end"
                    sx={{
                      visibility:
                        field.value !== '' && field.value !== null
                          ? 'visible'
                          : 'hidden',
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => {
                        field.onChange('');
                        setSearchValue('');
                        inputRef.current.focus();
                      }}
                    >
                      <ClearIcon fontSize="inherit" />
                    </IconButton>
                  </InputAdornment>
                }
              />
            )}
          />
          {showSubmitButton && (
            <Button variant="contained" type="submit" color="primary">
              Tìm kiếm
            </Button>
          )}
        </Box>
      </Tippy>
    </>
  );
};

export default InputBaseSearchHomeCustom;
