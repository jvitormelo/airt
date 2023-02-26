import { httpClient } from "@/services/http-client";
import { useUserStore } from "@/store/user-store";
import { useEffect } from "react";
import { useQuery } from "react-query";

const getUserMe = () =>
  httpClient.get("/users/me").then((res) => {
    useUserStore.setState((state) => ({
      ...state,
      user: res.data,
    }));

    return res.data;
  });

export const useUserMe = () => {
  return useQuery("me", getUserMe);
};

export function useInitUser() {
  useEffect(() => {
    getUserMe();
  }, []);
}
