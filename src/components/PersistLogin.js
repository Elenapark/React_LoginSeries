import React from "react";
import { Outlet } from "react-router";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import useLocalStorage from "../hooks/useLocalStorage";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();
  const [persist] = useLocalStorage("persist", false);

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh(); // 리턴값 없이 새로운 access token을 전역에 저장하기만 함
      } catch (err) {
        console.error(err);
      } finally {
        // it always runs
        isMounted && setIsLoading(false);
      }
    };
    // accessToken이 없는 경우에만 호출
    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

    return () => (isMounted = false);
  }, []);

  useEffect(() => {
    console.log("isLoading:", isLoading);
    console.log("accessToken:", JSON.stringify(auth?.accessToken));
  }, [isLoading]);

  return (
    <>{!persist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />}</>
  );
};

export default PersistLogin;
