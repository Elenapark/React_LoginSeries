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
        console.log("axios성공:", response);
        return response;
      },
      async (error) => {
        console.log("axios실패:", error);
        const prevReq = error?.config;
        // if req failed due to an expired access token - returns 403 forbidden
        // 기존 access Token이 만료되어 refresh api호출을 통해 새로운 access token을 받아오는 작업 추가
        if (error?.response?.status === 403 && !prevReq?.sent) {
          prevReq.sent = true;
          // custom property (sent) prevents from endless looping
          // we only retry once and 'sent' property indicates that.

          const newAccessToken = await refresh();
          prevReq.headers["Authorization"] = `Bearer ${newAccessToken}`;

          return axiosPrivate(prevReq); // 새로운 액세스 토큰 발급 후 실패한 기존 요청을 다시 재호출
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
