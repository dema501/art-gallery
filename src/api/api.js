import axios from "axios";
// import axiosRetry from "axios-retry";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3001",
  validateStatus: (status) => (status >= 200 && status < 300) || status === 404,
  timeout: process.env.REACT_APP_API_TIMEOUT || 10000, // 10 seconds timeout
});

// use retry
// axiosRetry(api, {
//   retries: process.env.REACT_APP_API_RETRIES || 3, // Number of retries
//   retryDelay: (...arg) =>
//     axiosRetry.exponentialDelay(
//       ...arg,
//       process.env.REACT_APP_API_DELAY || 1000,
//     ),
//   retryCondition(error) {
//     switch (error.response.status) {
//       //retry only if status is 500 or 501
//       case 500:
//       case 501:
//         return true;
//       default:
//         return false;
//     }
//   },
//   onRetry: (retryCount, error, requestConfig) => {
//     console.log(
//       `Retrying request ${requestConfig.url}, attempt ${retryCount}, error: ${error.message}`,
//     );
//   },
// });

// pass authorization header
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.authorization = token;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default api;
