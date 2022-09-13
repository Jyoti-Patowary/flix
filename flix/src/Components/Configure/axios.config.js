import axios from "axios";

axios.interceptors.request.use(function (config) {
  config.baseURL = "https://api.themoviedb.org/3";
  return config;
});

export const Axios =axios;
