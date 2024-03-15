import Config from "@/config";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: Config.apiUrl,
});

export const setBearerAuthToken = (token: string | undefined) => {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
