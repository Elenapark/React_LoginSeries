import { useLocation, Navigate, Outlet } from "react-router";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();
  // 로그인한 유저의 roles중에서 allowedRoles가 있는지 체크
  return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.user ? (
    //  로그인 페이지로 redirect되기 전 기존에 가고자 했던 페이지 state전달 및 뒤로가기 가능
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
