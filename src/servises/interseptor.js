const axios = require("axios");
const axiosApiInstance = axios.create({
  baseURL: "http://51.158.179.21/api/v1/",
});

axiosApiInstance.interceptors.request.use(
  async (config) => {
    if (localStorage.token) {
      config.headers = {
        Authorization: `Bearer ${localStorage.token}`,
      };
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosApiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    return Promise.reject(error);
  }
);

export const userToken = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = ``;
  },
};

export default axiosApiInstance;
