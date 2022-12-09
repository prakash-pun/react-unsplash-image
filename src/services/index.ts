import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export const BASE_URL = "https://api.unsplash.com";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

const getData = async (
  url: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse> => axiosInstance.get(url, config);

export interface ApiParameters {
  endpoint?: string | string[];
  name: string;
  type?: string;
  params?: any;
  data?: {
    [key: string]: any;
  };
}

export interface GetApiDataResponse {
  name?: string;
  status: "success" | "failure";
  data: any;
}

export const getImages = async (
  repo: ApiParameters
): Promise<GetApiDataResponse> => {
  const api = `${BASE_URL}/${repo.endpoint}`;

  try {
    const response = await getData(api);

    return {
      name: repo.name,
      status: "success",
      data: response.data,
    };
  } catch (error) {
    return {
      name: repo.name,
      status: "failure",
      data: error,
    };
  }
};
