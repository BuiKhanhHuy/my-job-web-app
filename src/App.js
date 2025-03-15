import "sweetalert2/src/sweetalert2.scss";

import "./App.css";

import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "./redux/userSlice";
import { getAllConfig } from "./redux/configSlice";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { viVN } from "@mui/material/locale";

// toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// theme
import BackdropLoading from "./components/loading/BackdropLoading";
import { ConfigProvider } from "antd";

// routes
import AppRoutes from "./routes/AppRouter";

// chatbot
import { MyJobChatBot } from "./chatbot";
import Feedback from "./components/Feedback";
import ScrollToTop from "./components/ScrollToTop";
import { ROLES_NAME } from "./configs/constants";

const mode = "light";
function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(true);
  const { isAllowVerifyEmail } = useSelector((state) => state.auth);
  const { isAuthenticated, currentUser } = useSelector((state) => state.user);
  const settings = {
    isAuthenticated: isAuthenticated,
    isJobSeekerRole: currentUser?.roleName === ROLES_NAME.JOB_SEEKER,
    isEmployerRole: currentUser?.roleName === ROLES_NAME.EMPLOYER,
    isAllowVerifyEmail: isAllowVerifyEmail,
  };

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
                  scrollbarColor: "#441da0 #fff",
                  "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
                    backgroundColor: "#fff",
                  },
                  "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
                    borderRadius: 8,
                    backgroundColor: "#441da0",
                    minHeight: 24,
                    border: "4px solid #fff",
                  },
                  "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus":
                    {
                      backgroundColor: "#441da0",
                    },
                  "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active":
                    {
                      backgroundColor: "#441da0",
                    },
                  "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
                    {
                      backgroundColor: "#441da0",
                    },
                  "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner":
                    {
                      backgroundColor: "#441da0",
                    },
                },
              },
            },
          },
          palette: {
            mode: mode,
            primary: {
              main: "#441da0",
            },
            secondary: {
              main: "#fca34d",
            },
            warning: {
              main: "#fca34d",
            },
            text: {
              hint: "#c0ca33",
            },
            background: {
              default: mode === "light" ? "#FAFAFF" : "black",
            },
          },
          shadows: [
            "none",
            "0px 2px 4px rgba(0, 0, 0, 0.05), 0px 1px 16px rgba(0, 0, 0, 0.03)",
            "0px 1px 3px rgba(0, 0, 0, 0.08)",
            "0px 2px 4px rgba(0, 0, 0, 0.12)",
            "0px 3px 5px rgba(0, 0, 0, 0.14)",
            "0px 4px 6px rgba(0, 0, 0, 0.16)",
            "0px 5px 7px rgba(0, 0, 0, 0.18)",
            "0px 6px 8px rgba(0, 0, 0, 0.20)",
            "0px 7px 9px rgba(0, 0, 0, 0.22)",
            "0px 8px 10px rgba(0, 0, 0, 0.24)",
            "0px 9px 11px rgba(0, 0, 0, 0.26)",
            "0px 10px 12px rgba(0, 0, 0, 0.28)",
            "0px 11px 13px rgba(0, 0, 0, 0.30)",
            "0px 12px 14px rgba(0, 0, 0, 0.32)",
            "0px 13px 15px rgba(0, 0, 0, 0.34)",
            "0px 14px 16px rgba(0, 0, 0, 0.36)",
            "0px 15px 17px rgba(0, 0, 0, 0.38)",
            "0px 16px 18px rgba(0, 0, 0, 0.40)",
            "0px 17px 19px rgba(0, 0, 0, 0.42)",
            "0px 18px 20px rgba(0, 0, 0, 0.44)",
            "0px 19px 21px rgba(0, 0, 0, 0.46)",
            "0px 20px 22px rgba(0, 0, 0, 0.48)",
            "0px 21px 23px rgba(0, 0, 0, 0.50)",
            "0px 22px 24px rgba(0, 0, 0, 0.52)",
            "0px 23px 25px rgba(0, 0, 0, 0.54)",
          ],
          props: {
            MuiTooltip: {
              arrow: true,
            },
            MuiAppBar: {
              color: "inherit",
            },
          },
          overrides: {
            MuiAppBar: {
              colorInherit: {
                backgroundColor: "#689f38",
                color: "#fff",
              },
            },
          },
          typography: {
            fontFamily: ["Open Sans", "sans-serif"].join(","),
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
              fontSize: "20px",
              fontWeight: "bold",
            },
            subtitle1: {},
            subtitle2: {},
            body1: {},
            body2: {},
            caption: {
              fontSize: "0.85rem",
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
      .then((res) => console.log("Mới vào app: ", res))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#441da0",
          },
        }}
      >
        <ThemeProvider theme={theme}>
          <CssBaseline enableColorScheme />
          {loading ? (
            <BackdropLoading bgColor="white" />
          ) : (
            <AppRoutes settings={settings} />
          )}
          {/* Start: toast */}
          <ToastContainer autoClose={1300} />
          {/* End: toast */}

          {/* Start: Feedback */}
          {isAuthenticated && <Feedback />}
          {/* End: Feedback */}

          <MyJobChatBot />
        </ThemeProvider>
      </ConfigProvider>
      {/* Start: ScrollToTop */}
      <ScrollToTop />
      {/* End: ScrollToTop */}
    </>
  );
}

export default App;
