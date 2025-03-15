import { Outlet } from "react-router-dom";
import { HOST_NAME, ROUTES } from "./constants";
import {
  HomeLayout,
  DefaultLayout,
  JobSeekerLayout,
  EmployerLayout,
  ChatLayout,
} from "../layouts";
import {
  EmailVerificationRequiredPage,
  EmployerLogin,
  EmployerSignUp,
  ForgotPasswordPage,
  JobSeekerLogin,
  JobSeekerSignUp,
  ResetPasswordPage,
} from "../pages/authPages";
import { ChatPage } from "../pages/chatPages";
import {
  AboutUsPage,
  CompanyDetailPage,
  CompanyPage,
  HomePage,
  JobDetailPage,
  JobPage,
  JobsByCareerPage,
  JobsByCityPage,
  JobsByJobTypePage,
  NotificationPage,
} from "../pages/defaultPages";
import {
  AccountPage,
  AttachedProfilePage,
  DashboardPage,
  MyCompanyPage,
  MyJobPage,
  OnlineProfilePage,
  ProfilePage,
} from "../pages/jobSeekerPages";
import {
  AccountPage as EmployerAccountPage,
  CompanyPage as EmployerCompanyPage,
  DashboardPage as EmployerDashboardPage,
  JobPostPage as EmployerJobPostPage,
  ProfileAppliedPage as EmployerProfileAppliedPage,
  ProfileDetailPage as EmployerProfileDetailPage,
  ProfilePage as EmployerProfilePage,
  SavedProfilePage as EmployerSavedProfilePage,
  SettingPage as EmployerSettingPage,
} from "../pages/employerPages";
import {
  ForbiddenPage,
  NotFoundPage,
} from "../pages/errorsPage";

const routesConfig = {
  [HOST_NAME.MYJOB]: [
    {
      path: ROUTES.JOB_SEEKER.HOME,
      layouts: Outlet,
      children: [
        {
          layouts: HomeLayout,
          children: [
            {
              index: true,
              element: HomePage,
            },
          ],
        },
        {
          layouts: DefaultLayout,
          children: [
            {
              path: ROUTES.JOB_SEEKER.JOBS,
              element: JobPage,
            },
            {
              path: ROUTES.JOB_SEEKER.JOB_DETAIL,
              element: JobDetailPage,
            },
            {
              path: ROUTES.JOB_SEEKER.COMPANY,
              element: CompanyPage,
            },
            {
              path: ROUTES.JOB_SEEKER.COMPANY_DETAIL,
              element: CompanyDetailPage,
            },
            {
              path: ROUTES.JOB_SEEKER.ABOUT_US,
              element: AboutUsPage,
            },
            {
              path: ROUTES.JOB_SEEKER.JOBS_BY_CAREER,
              element: JobsByCareerPage,
            },
            {
              path: ROUTES.JOB_SEEKER.JOBS_BY_CITY,
              element: JobsByCityPage,
            },
            {
              path: ROUTES.JOB_SEEKER.JOBS_BY_TYPE,
              element: JobsByJobTypePage,
            },
          ],
        },
        {
          path: ROUTES.JOB_SEEKER.DASHBOARD,
          layouts: JobSeekerLayout,
          checkCondition: (settings) =>
            settings.isAuthenticated && settings.isJobSeekerRole,
          redirectUrl: "/" + ROUTES.AUTH.LOGIN,
          children: [
            {
              index: true,
              element: DashboardPage,
            },
            {
              path: ROUTES.JOB_SEEKER.PROFILE,
              element: ProfilePage,
            },
            {
              path: ROUTES.JOB_SEEKER.STEP_PROFILE,
              element: OnlineProfilePage,
            },
            {
              path: ROUTES.JOB_SEEKER.ATTACHED_PROFILE,
              element: AttachedProfilePage,
            },
            {
              path: ROUTES.JOB_SEEKER.MY_JOB,
              element: MyJobPage,
            },
            {
              path: ROUTES.JOB_SEEKER.MY_COMPANY,
              element: MyCompanyPage,
            },
            {
              path: ROUTES.JOB_SEEKER.NOTIFICATION,
              element: NotificationPage,
            },
            {
              path: ROUTES.JOB_SEEKER.ACCOUNT,
              element: AccountPage,
            },
          ],
        },
        {
          layouts: DefaultLayout,
          checkCondition: (settings) => !settings.isAuthenticated,
          redirectUrl: "/" + ROUTES.JOB_SEEKER.HOME,
          children: [
            {
              path: ROUTES.AUTH.EMAIL_VERIFICATION,
              checkCondition: (settings) => settings.isAllowVerifyEmail,
              redirectUrl: "/" + ROUTES.AUTH.LOGIN,
              element: EmailVerificationRequiredPage,
            },
            {
              path: ROUTES.AUTH.FORGOT_PASSWORD,
              element: ForgotPasswordPage,
            },
            {
              path: ROUTES.AUTH.RESET_PASSWORD,
              element: ResetPasswordPage,
            },
            {
              path: ROUTES.AUTH.LOGIN,
              element: JobSeekerLogin,
            },
            {
              path: ROUTES.AUTH.REGISTER,
              element: JobSeekerSignUp,
            },
          ],
        },
        {
          path: ROUTES.JOB_SEEKER.CHAT,
          layouts: ChatLayout,
          checkCondition: (settings) =>
            settings.isAuthenticated && settings.isJobSeekerRole,
          redirectUrl: "/" + ROUTES.AUTH.LOGIN,
          children: [
            {
              index: true,
              element: ChatPage,
            },
          ],
        },
      ],
    },
    {
      path: ROUTES.ERROR.FORBIDDEN,
      element: ForbiddenPage,
    },
    {
      path: ROUTES.ERROR.NOT_FOUND,
      element: NotFoundPage,
    },
  ],
  [HOST_NAME.EMPLOYER_MYJOB]: [
    {
      path: ROUTES.EMPLOYER.DASHBOARD,
      layouts: EmployerLayout,
      checkCondition: (settings) =>
        settings.isAuthenticated && settings.isEmployerRole,
      redirectUrl: "/" + ROUTES.AUTH.LOGIN,
      children: [
        {
          index: true,
          element: EmployerDashboardPage,
        },
        {
          path: ROUTES.EMPLOYER.JOB_POST,
          element: EmployerJobPostPage,
        },
        {
          path: ROUTES.EMPLOYER.APPLIED_PROFILE,
          element: EmployerProfileAppliedPage,
        },
        {
          path: ROUTES.EMPLOYER.SAVED_PROFILE,
          element: EmployerSavedProfilePage,
        },
        {
          path: ROUTES.EMPLOYER.PROFILE,
          element: EmployerProfilePage,
        },
        {
          path: ROUTES.EMPLOYER.PROFILE_DETAIL,
          element: EmployerProfileDetailPage,
        },
        {
          path: ROUTES.EMPLOYER.COMPANY,
          element: EmployerCompanyPage,
        },
        {
          path: ROUTES.EMPLOYER.NOTIFICATION,
          element: NotificationPage,
        },
        {
          path: ROUTES.EMPLOYER.ACCOUNT,
          element: EmployerAccountPage,
        },
        {
          path: ROUTES.EMPLOYER.SETTING,
          element: EmployerSettingPage,
        },
      ],
    },
    {
      layouts: DefaultLayout,
      checkCondition: (settings) => !settings.isAuthenticated,
      redirectUrl: "/" + ROUTES.EMPLOYER.DASHBOARD,
      children: [
        {
          path: ROUTES.AUTH.EMAIL_VERIFICATION,
          checkCondition: (settings) => settings.isAllowVerifyEmail,
          redirectUrl: "/" + ROUTES.AUTH.LOGIN,
          element: EmailVerificationRequiredPage,
        },
        {
          path: ROUTES.AUTH.FORGOT_PASSWORD,
          element: ForgotPasswordPage,
        },
        {
          path: ROUTES.AUTH.RESET_PASSWORD,
          element: ResetPasswordPage,
        },
        {
          path: ROUTES.AUTH.LOGIN,
          element: EmployerLogin,
        },
        {
          path: ROUTES.AUTH.REGISTER,
          element: EmployerSignUp,
        },
      ],
    },
    {
      path: ROUTES.EMPLOYER.CHAT,
      layouts: ChatLayout,
      checkCondition: (settings) =>
        settings.isAuthenticated && settings.isEmployerRole,
      redirectUrl: "/" + ROUTES.AUTH.LOGIN,
      children: [
        {
          index: true,
          element: ChatPage,
        },
      ],
    },
    {
      path: ROUTES.ERROR.FORBIDDEN,
      element: ForbiddenPage,
    },
    {
      path: ROUTES.ERROR.NOT_FOUND,
      element: NotFoundPage,
    },
  ],
};

export default routesConfig;
