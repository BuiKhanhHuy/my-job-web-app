import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Button, Stack, styled, Divider } from "@mui/material";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import { LoginSocialFacebook, LoginSocialGoogle } from "reactjs-social-login";

import TextFieldCustom from "../../../../components/controls/TextFieldCustom";
import PasswordTextFieldCustom from "../../../../components/controls/PasswordTextFieldCustom";
import { AUTH_CONFIG } from "../../../../configs/constants";

const StyledButton = styled(Button)(({ theme }) => ({
  padding: "8px 16px",
  borderRadius: "8px",
  fontSize: "14px",
  fontWeight: 500,
  textTransform: "none",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  transition: "all 0.2s ease",
  "&:hover": {
    transform: "translateY(-1px)",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  },
}));

const StyledSocialButton = styled(Button)(({ theme }) => ({
  padding: "8px 16px",
  borderRadius: "8px",
  fontSize: "14px",
  fontWeight: 500,
  textTransform: "none",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  transition: "all 0.2s ease",
  "&:hover": {
    transform: "translateY(-1px)",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  },
}));

const StyledDivider = styled(Divider)({
  margin: "20px 0",
  "&::before, &::after": {
    borderColor: "rgba(0, 0, 0, 0.2)",
  },
  "& .MuiDivider-wrapper": {
    padding: "0 16px",
    fontSize: "13px",
    color: "rgba(0, 0, 0, 0.6)",
  },
});

const JobSeekerSignUpForm = ({
  onRegister,
  onFacebookRegister,
  onGoogleRegister,
  serverErrors = {},
}) => {
  const schema = yup.object().shape({
    fullName: yup.string().required("Họ và tên là bắt buộc."),
    email: yup
      .string()
      .required("Email là bắt buộc!")
      .email("Email không đúng định dạng")
      .max(100, "Email vượt quá độ dài cho phép."),
    password: yup
      .string()
      .required("Mật khẩu là bắt buộc!")
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự.")
      .max(128, "Mật khẩu vượt quá độ dài cho phép.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Phải chứa một chữ hoa, một chữ thường, một số và một ký tự đặc biệt"
      ),
    confirmPassword: yup
      .string()
      .required("Mật khẩu xác nhận là bắt buộc.")
      .oneOf([yup.ref("password")], "Mật khẩu xác nhận không chính xác."),
  });

  const { control, setError, handleSubmit } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(schema),
  });

  React.useEffect(() => {
    for (let err in serverErrors) {
      setError(err, { type: 400, message: serverErrors[err]?.join(" ") });
    }
  }, [serverErrors, setError]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onRegister)}
      sx={{
        width: "100%",
        "& .MuiTextField-root": {
          borderRadius: "10px",
        },
      }}
    >
      <Stack spacing={2.5} sx={{ mb: 3 }}>
        <TextFieldCustom
          name="fullName"
          control={control}
          title="Họ và tên"
          placeholder="Nhập họ và tên của bạn"
          showRequired={true}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
            },
          }}
        />
        <TextFieldCustom
          name="email"
          control={control}
          title="Email"
          placeholder="Nhập email của bạn"
          showRequired={true}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
            },
          }}
        />
        <PasswordTextFieldCustom
          name="password"
          control={control}
          title="Mật khẩu"
          placeholder="Nhập mật khẩu của bạn"
          showRequired={true}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
            },
          }}
        />
        <PasswordTextFieldCustom
          name="confirmPassword"
          control={control}
          title="Mật khẩu xác nhận"
          placeholder="Nhập lại mật khẩu của bạn"
          showRequired={true}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
            },
          }}
        />
      </Stack>
      <StyledButton
        fullWidth
        variant="contained"
        type="submit"
        endIcon={<HowToRegIcon />}
      >
        Đăng ký
      </StyledButton>

      <StyledDivider>Hoặc đăng ký với</StyledDivider>

      <Stack 
        direction="row" 
        spacing={2}
        sx={{
          width: '100%',
          '& > *': {
            flex: 1,
          }
        }}
      >
        <LoginSocialFacebook
          appId={AUTH_CONFIG.FACEBOOK_CLIENT_ID}
          fieldsProfile={"id"}
          isOnlyGetToken={true}
          ux_mode="popup"
          onResolve={onFacebookRegister}
          onReject={(err) => {
            console.log(err);
          }}
        >
          <StyledSocialButton
            fullWidth
            variant="outlined"
            onClick={onFacebookRegister}
            startIcon={<FacebookIcon />}
            sx={{
              borderColor: "#4267B2",
              color: "#4267B2",
              "&:hover": {
                borderColor: "#4267B2",
                backgroundColor: "rgba(66, 103, 178, 0.04)",
              },
            }}
          >
            Facebook
          </StyledSocialButton>
        </LoginSocialFacebook>

        <LoginSocialGoogle
          client_id={AUTH_CONFIG.GOOGLE_CLIENT_ID}
          isOnlyGetToken={true}
          ux_mode="popup"
          access_type="offline"
          scope="openid profile email"
          discoveryDocs="claims_supported"
          onResolve={onGoogleRegister}
          onReject={(err) => {
            console.log(err);
          }}
        >
          <StyledSocialButton
            fullWidth
            variant="outlined"
            onClick={onGoogleRegister}
            startIcon={<GoogleIcon />}
            sx={{
              borderColor: "#DB4437",
              color: "#DB4437",
              "&:hover": {
                borderColor: "#DB4437",
                backgroundColor: "rgba(219, 68, 55, 0.04)",
              },
            }}
          >
            Google
          </StyledSocialButton>
        </LoginSocialGoogle>
      </Stack>
    </Box>
  );
};

export default JobSeekerSignUpForm;
