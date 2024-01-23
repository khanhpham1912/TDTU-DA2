import axios, { AxiosRequestConfig } from "axios";
axios.defaults.withCredentials = true;
axios.defaults.headers["Access-Control-Allow-Origin"] = "*";

axios.interceptors.request.use(
  async (config) => {
    if (typeof window !== "undefined") {
      let locale = "vi";
      const currentUrl = window.location.href;
      if (currentUrl?.includes("/en")) {
        locale = "en";
      }
      config.headers["locale"] = locale;
    }
    const token = await localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

function httpClient<T>(
  path: string,
  config?: AxiosRequestConfig & { internal?: boolean }
): Promise<T> {
  const apiUrl = process.env.API_URL + path;

  return new Promise((res, rej) =>
    axios({ url: apiUrl, ...config })
      .then((result) => res(result.data))
      .catch((error) => rej(error))
  );
}

export default httpClient;
