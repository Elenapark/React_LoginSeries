import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

// just to attach the interceptors to this axios instance
const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          // not a retry, but a first attempt
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`; // accessT we were given initially when we sign in
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => {
        console.log("응답인터셉터 성공:", response);
        return response;
      },
      async (error) => {
        console.log("응답인터셉터 실패:", error);
        const prevReq = error?.config;
        // if req failed due to an expired access token - returns 403 forbidden
        // 기존 access Token이 만료되어 refresh api호출을 통해 새로운 access token을 받아오는 작업 추가
        if (error?.response?.status === 403 && !prevReq?.sent) {
          prevReq.sent = true;
          // custom property (sent) prevents from endless looping
          // we only retry once and 'sent' property indicates that.

          const newAccessToken = await refresh();
          prevReq.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevReq);
        }
        return Promise.reject(error);
      }
    );

    // remove interceptors on unmouts
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
