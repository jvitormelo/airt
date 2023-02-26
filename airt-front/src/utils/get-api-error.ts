import { AxiosError } from "axios";

interface ResponseError {
  message: string;
  status: number;
}

const defaultError = { message: "Something went wrong", status: 500 };

export const getError = (error: unknown) => {
  if (error && typeof error === "object" && "response" in error) {
    const axiosError = error as AxiosError<ResponseError>;

    return axiosError.response?.data || defaultError;
  }

  return defaultError;
};
