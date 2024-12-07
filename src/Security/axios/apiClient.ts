import axios, { AxiosError, AxiosRequestConfig } from "axios";

const env = import.meta.env.VITE_NODE_ENV;
const baseURL =
  env === "dev" ? "http://localhost:8080/api" : "https://xarchive.store/api";
console.log(env, baseURL);

const apiClient = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const axiosclient = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const subscribeTokenRefresh = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

const onRefreshed = (newToken: string) => {
  refreshSubscribers.forEach((callback) => callback(newToken));
  refreshSubscribers = [];
};

apiClient.interceptors.request.use(
  (config) => {
    const noTokenPaths = ["/auth/login", "/auth/refresh-token"];
    const shouldExclude = noTokenPaths.some(
      (path) => config.url && config.url.includes(path)
    );

    if (!shouldExclude) {
      const token = localStorage.getItem("accessToken");
      if (token) {
        if (!config.headers) {
          config.headers = new axios.AxiosHeaders();
        }
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(undefined, async (error: AxiosError) => {
  const originalRequest = error.config as AxiosRequestConfig & {
    _retry?: boolean;
  };

  if (
    error.response &&
    error.response.status === 401 &&
    !originalRequest._retry
  ) {
    if (isRefreshing) {
      return new Promise((resolve) => {
        subscribeTokenRefresh((newToken: string) => {
          if (!originalRequest.headers) {
            originalRequest.headers = {};
          }
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          resolve(apiClient(originalRequest));
        });
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const refreshTokenResponse = await axiosclient.post(
        "/auth/refresh-token"
      );

      const newToken = refreshTokenResponse.headers["authorization"];

      if (newToken) {
        console.log("Set New Access Token:" + newToken);
        const tokenPart = newToken.split(" ")[1];
        localStorage.setItem("accessToken", tokenPart);
        onRefreshed(tokenPart);

        if (!originalRequest.headers) {
          originalRequest.headers = {};
        }
        originalRequest.headers.Authorization = `Bearer ${tokenPart}`;
        return apiClient(originalRequest);
      }
    } catch (refreshError) {
      localStorage.removeItem("accessToken");
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
  return Promise.reject(error);
});

export default apiClient;
