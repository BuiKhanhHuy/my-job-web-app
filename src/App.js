import 'sweetalert2/src/sweetalert2.scss';

import './App.css';

import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, Route, Routes } from 'react-router-dom';
import { getUserInfo } from './redux/userSlice';
import { getAllConfig } from './redux/configSlice';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { viVN } from '@mui/material/locale';

import { ROLES_NAME } from './configs/constants';

// toast
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// theme
import BackdropLoading from './components/loading/BackdropLoading';
import { ConfigProvider } from 'antd';

// layouts
import HomeLayout from './layouts/HomeLayout';
import DefaultLayout from './layouts/DefaultLayout';
import JobSeekerLayout from './layouts/JobSeekerLayout';
import EmployerLayout from './layouts/EmployerLayout';
import ChatLayout from './layouts/ChatLayout';

// errors pages
import NotFoundPage from './pages/errorsPage/NotFoundPage';
import ForbiddenPage from './pages/errorsPage/ForbiddenPage/index.';

// common pages
import HomePage from './pages/defaultPages/HomePage';
import JobPage from './pages/defaultPages/JobPage';
import JobDetailPage from './pages/defaultPages/JobDetailPage';
import CompanyPage from './pages/defaultPages/CompanyPage';
import CompanyDetailPage from './pages/defaultPages/CompanyDetailPage';
import JobsByCareerPage from './pages/defaultPages/JobsByCareerPage';
import JobsByCityPage from './pages/defaultPages/JobsByCityPage';
import JobsByJobTypePage from './pages/defaultPages/JobsByJobTypePage';
import AboutUsPage from './pages/defaultPages/AboutUsPage';
import NotificationPage from './pages/defaultPages/NotificationPage';

// auth pages
import EmailVerificationRequiredPage from './pages/authPages/EmailVerificationRequiredPage';
import ForgotPasswordPage from './pages/authPages/ForgotPasswordPage';
import ResetPasswordPage from './pages/authPages/ResetPasswordPage';
import JobSeekerLogin from './pages/authPages/JobSeekerLogin';
import JobSeekerSignUp from './pages/authPages/JobSeekerSignUp';
import EmployerLogin from './pages/authPages/EmployerLogin';
import EmployerSignUp from './pages/authPages/EmployerSignUp';

// routes
import PrivateRoutes from './routes';

// job seeker pages
import { default as JobSeekerDashboardPage } from './pages/jobSeekerPages/DashboardPage';
import { default as JobSeekerProfilePage } from './pages/jobSeekerPages/ProfilePage';
import { default as OnlineProfilePage } from './pages/jobSeekerPages/OnlineProfilePage';
import { default as JobSeekerAttachedProfilePage } from './pages/jobSeekerPages/AttachedProfilePage';
import { default as JobSeekerMyJobPage } from './pages/jobSeekerPages/MyJobPage';
import { default as JobSeekerMyCompanyPage } from './pages/jobSeekerPages/MyCompanyPage';
import { default as JobSeekerAccountPage } from './pages/jobSeekerPages/AccountPage';

// employer pages
import { default as EmployerDashboardPage } from './pages/employerPages/DashboardPage';
import { default as EmployerJobPostPage } from './pages/employerPages/JobPostPage';
import { default as EmployerProfileAppliedPage } from './pages/employerPages/ProfileAppliedPage';
import { default as EmployerSavedProfilePage } from './pages/employerPages/SavedProfilePage';
import { default as EmployerProfilePage } from './pages/employerPages/ProfilePage';
import { default as ProfileDetailPage } from './pages/employerPages/ProfileDetailPage';
import { default as EmployerCompanyPage } from './pages/employerPages/CompanyPage';
import { default as EmployerAccountPage } from './pages/employerPages/AccountPage';

// chatbot
import { MyJobChatBot } from './chatbox';
import Feedback from './components/Feedback';
import ScrollToTop from './components/ScrollToTop';

// chat
import ChatPage from './pages/authPages/ChatPage';

const mode = 'light';
function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(true);
  const { isAllowVerifyEmail, roleName } = useSelector((state) => state.auth);
  const { isAuthenticated, currentUser } = useSelector((state) => state.user);

  const theme = React.useMemo(
    () =>
      createTheme(
        {
          zIndex: {
            card: 0,
          },
          breakpoints: {
            values: {
              xs: 0,
              sm: 600,
              md: 900,
              lg: 1300,
              xl: 1500,
            },
          },
          components: {
            MuiPaper: {
              styleOverrides: {
                root: {
                  // zIndex: 1,
                },
              },
            },
            MuiCssBaseline: {
              styleOverrides: {
                body: {
                  scrollbarColor: '#441da0 #441da0',
                  '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
                    backgroundColor: '#fff',
                  },
                  '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
                    borderRadius: 8,
                    backgroundColor: '#441da0',
                    minHeight: 24,
                    border: '4px solid #fff',
                  },
                  '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus':
                    {
                      backgroundColor: '#441da0',
                    },
                  '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active':
                    {
                      backgroundColor: '#441da0',
                    },
                  '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover':
                    {
                      backgroundColor: '#441da0',
                    },
                  '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner':
                    {
                      backgroundColor: '#441da0',
                    },
                },
              },
            },
          },

          palette: {
            mode: mode,
            primary: {
              main: '#441da0',
            },
            secondary: {
              main: '#fca34d',
            },
            warning: {
              main: '#fca34d',
            },
            text: {
              hint: '#c0ca33',
            },
            background: {
              default: mode === 'light' ? '#FAFAFF' : 'black',
            },
          },
          shadows: [
            'none',
            '0px 2px 4px rgba(0, 0, 0, 0.05), 0px 1px 16px rgba(0, 0, 0, 0.03)',
            '0px 1px 3px rgba(0, 0, 0, 0.08)',
            '0px 2px 4px rgba(0, 0, 0, 0.12)',
            '0px 3px 5px rgba(0, 0, 0, 0.14)',
            '0px 4px 6px rgba(0, 0, 0, 0.16)',
            '0px 5px 7px rgba(0, 0, 0, 0.18)',
            '0px 6px 8px rgba(0, 0, 0, 0.20)',
            '0px 7px 9px rgba(0, 0, 0, 0.22)',
            '0px 8px 10px rgba(0, 0, 0, 0.24)',
            '0px 9px 11px rgba(0, 0, 0, 0.26)',
            '0px 10px 12px rgba(0, 0, 0, 0.28)',
            '0px 11px 13px rgba(0, 0, 0, 0.30)',
            '0px 12px 14px rgba(0, 0, 0, 0.32)',
            '0px 13px 15px rgba(0, 0, 0, 0.34)',
            '0px 14px 16px rgba(0, 0, 0, 0.36)',
            '0px 15px 17px rgba(0, 0, 0, 0.38)',
            '0px 16px 18px rgba(0, 0, 0, 0.40)',
            '0px 17px 19px rgba(0, 0, 0, 0.42)',
            '0px 18px 20px rgba(0, 0, 0, 0.44)',
            '0px 19px 21px rgba(0, 0, 0, 0.46)',
            '0px 20px 22px rgba(0, 0, 0, 0.48)',
            '0px 21px 23px rgba(0, 0, 0, 0.50)',
            '0px 22px 24px rgba(0, 0, 0, 0.52)',
            '0px 23px 25px rgba(0, 0, 0, 0.54)',
          ],
          props: {
            MuiTooltip: {
              arrow: true,
            },
            MuiAppBar: {
              color: 'inherit',
            },
          },
          overrides: {
            MuiAppBar: {
              colorInherit: {
                backgroundColor: '#689f38',
                color: '#fff',
              },
            },
          },
          typography: {
            fontFamily: ['Open Sans', 'sans-serif'].join(','),
            h1: {},
            h2: {},
            h3: {},
            h4: {
              fontWeight: 800,
            },
            h5: {
              fontWeight: 700,
              fontSize: 21,
            },
            h6: {
              fontSize: '20px',
              fontWeight: 'bold',
            },
            subtitle1: {},
            subtitle2: {},
            body1: {},
            body2: {},
            caption: {
              fontSize: '0.85rem',
            },
          },
        },
        viVN
      ),
    []
  );

  React.useEffect(() => {
    Promise.all([
      dispatch(getUserInfo()).unwrap(),
      dispatch(getAllConfig()).unwrap(),
    ])
      .then((res) => console.log('Mới vào app: ', res))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#441da0',
            },
          }}
        >
          <CssBaseline enableColorScheme />
          {loading ? (
            <BackdropLoading bgColor="white" />
          ) : (
            <Routes>
              <Route path="/" element={<Outlet />}>
                {/* Start: Home */}
                <Route path="" element={<HomeLayout />}>
                  <Route path="" element={<HomePage />} />
                </Route>
                {/* End: Home */}
                {/* Start: Common */}
                <Route path="" element={<DefaultLayout />}>
                  <Route path="viec-lam" element={<JobPage />} />
                  <Route path="viec-lam/:slug" element={<JobDetailPage />} />
                  <Route path="cong-ty" element={<CompanyPage />} />
                  <Route path="cong-ty/:slug" element={<CompanyDetailPage />} />
                  <Route path="ve-chung-toi" element={<AboutUsPage />} />
                  <Route
                    path="viec-lam-theo-nganh-nghe"
                    element={<JobsByCareerPage />}
                  />
                  <Route
                    path="viec-lam-theo-tinh-thanh"
                    element={<JobsByCityPage />}
                  />
                  <Route
                    path="viec-lam-theo-hinh-thuc-lam-viec"
                    element={<JobsByJobTypePage />}
                  />
                </Route>
                {/* End: Common */}
                {/* Start: Job seeker */}
                <Route
                  path="ung-vien"
                  element={
                    <PrivateRoutes
                      isAuthenticated={
                        isAuthenticated &&
                        currentUser?.roleName === ROLES_NAME.JOB_SEEKER
                      }
                      redirectUrl="/dang-nhap-ung-vien"
                    >
                      <JobSeekerLayout />
                    </PrivateRoutes>
                  }
                >
                  <Route path="" element={<JobSeekerDashboardPage />} />
                  <Route path="ho-so" element={<JobSeekerProfilePage />} />
                  <Route
                    path="ho-so-tung-buoc/:slug"
                    element={<OnlineProfilePage />}
                  />
                  <Route
                    path="ho-so-dinh-kem/:slug"
                    element={<JobSeekerAttachedProfilePage />}
                  />
                  <Route
                    path="viec-lam-cua-toi"
                    element={<JobSeekerMyJobPage />}
                  />
                  <Route
                    path="cong-ty-cua-toi"
                    element={<JobSeekerMyCompanyPage />}
                  />
                  <Route path="thong-bao" element={<NotificationPage />} />
                  <Route path="tai-khoan" element={<JobSeekerAccountPage />} />
                </Route>
                {/* End: Job seeker */}
                {/* Start: Employer */}
                <Route
                  path="nha-tuyen-dung"
                  element={
                    <PrivateRoutes
                      isAuthenticated={
                        isAuthenticated &&
                        currentUser?.roleName === ROLES_NAME.EMPLOYER
                      }
                      redirectUrl="/dang-nhap-nha-tuyen-dung"
                    >
                      <EmployerLayout />
                    </PrivateRoutes>
                  }
                >
                  <Route path="" element={<EmployerDashboardPage />} />
                  <Route
                    path="tin-tuyen-dung"
                    element={<EmployerJobPostPage />}
                  />

                  <Route
                    path="ho-so-ung-tuyen"
                    element={<EmployerProfileAppliedPage />}
                  />
                  <Route
                    path="ho-so-da-luu"
                    element={<EmployerSavedProfilePage />}
                  />
                  <Route
                    path="danh-sach-ung-vien"
                    element={<EmployerProfilePage />}
                  />
                  <Route
                    path="chi-tiet-ung-vien/:slug"
                    element={<ProfileDetailPage />}
                  />
                  <Route path="cong-ty" element={<EmployerCompanyPage />} />
                  <Route path="thong-bao" element={<NotificationPage />} />
                  <Route path="tai-khoan" element={<EmployerAccountPage />} />
                </Route>
                {/* End: Employer */}
                {/* Start: Auth */}
                <Route
                  path=""
                  element={
                    <PrivateRoutes
                      isAuthenticated={!isAuthenticated}
                      redirectUrl="/"
                    >
                      <DefaultLayout />
                    </PrivateRoutes>
                  }
                >
                  <Route
                    path="email-verification-required"
                    element={
                      <PrivateRoutes
                        isAuthenticated={isAllowVerifyEmail}
                        redirectUrl={
                          roleName === ROLES_NAME.EMPLOYER
                            ? '/dang-nhap-nha-tuyen-dung'
                            : '/dang-nhap-ung-vien'
                        }
                      >
                        <EmailVerificationRequiredPage />
                      </PrivateRoutes>
                    }
                  />
                  <Route
                    path="quen-mat-khau"
                    element={<ForgotPasswordPage />}
                  />
                  <Route
                    path="cap-nhat-mat-khau/:token"
                    element={<ResetPasswordPage />}
                  />
                  <Route
                    path="dang-nhap-ung-vien"
                    element={<JobSeekerLogin />}
                  />
                  <Route
                    path="dang-ky-tai-khoan-ung-vien"
                    element={<JobSeekerSignUp />}
                  />
                  <Route
                    path="dang-nhap-nha-tuyen-dung"
                    element={<EmployerLogin />}
                  />
                  <Route
                    path="dang-ky-tai-khoan-nha-tuyen-dung"
                    element={<EmployerSignUp />}
                  />
                </Route>
                {/* End: Auth */}

                {/* Start: Chat */}

                <Route
                  path="ket-noi-voi-ung-vien"
                  element={
                    <PrivateRoutes
                      isAuthenticated={
                        isAuthenticated &&
                        currentUser?.roleName === ROLES_NAME.EMPLOYER
                      }
                      redirectUrl="/dang-nhap-nha-tuyen-dung"
                    >
                      <ChatLayout />
                    </PrivateRoutes>
                  }
                >
                  <Route path="" element={<ChatPage />} />
                </Route>
                <Route
                  path="ket-noi-voi-nha-tuyen-dung"
                  element={
                    <PrivateRoutes
                      isAuthenticated={
                        isAuthenticated &&
                        currentUser?.roleName === ROLES_NAME.JOB_SEEKER
                      }
                      redirectUrl="/dang-nhap-ung-vien"
                    >
                      <ChatLayout />
                    </PrivateRoutes>
                  }
                >
                  <Route path="" element={<ChatPage />} />
                </Route>

                {/* End: Chat */}
              </Route>
              {/* Start: Errors */}
              <Route path="*" element={<NotFoundPage />} />
              <Route path="/forbidden" element={<ForbiddenPage />} />
              {/* Start: Errors */}
            </Routes>
          )}
          {/* Start: toast */}
          <ToastContainer autoClose={1300} />
          {/* End: toast */}

          {/* Start: Feedback */}
          {isAuthenticated && <Feedback />}
          {/* End: Feedback */}
        </ConfigProvider>
      </ThemeProvider>
      {/* Start: Chatbot */}
      <MyJobChatBot />
      {/* End: Chatbot */}

      {/* Start: ScrollToTop */}
      <ScrollToTop />
      {/* End: ScrollToTop */}
    </>
  );
}

export default App;
