import axios from "./axiosContext";

const Login = (data) => {
  return axios.post("/user/login", data);
};
const Register = (data) => {
  return axios.post("/admin", data);
};

// Password reset request
const RequestPasswordReset = (email) => {
  return axios.post("/user/forget-password", { email });
};
const ResetPassword = (token, data) => {
  return axios.post(`/user/reset-password/${token}`, data);
};
export default { Login, Register };
