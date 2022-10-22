import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Users = () => {
  const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate(); // interceptor가 추가된 axios

  // 마지막으로, 만약 refresh token이 만료되었을 경우에는?
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    // cancel pending request when we componente unmounts
    const controller = new AbortController();
    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/users", {
          signal: controller.signal,
        });
        const userNames = response.data.map((user) => user.username);
        console.log("/users응답", response.data);
        isMounted && setUsers(userNames);
      } catch (err) {
        console.log(err);
        if (err?.message !== "canceled") {
          // refresh token이 만료되는 경우 - 로그인 시킨 후 기존 location으로 이동
          navigate("/login", { state: { from: location }, replace: true });
        }
      }
    };
    getUsers();

    //clean up and cancel request when unmounts
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <article>
      <h2>Users List</h2>
      {users?.length ? (
        <ul>
          {users.map((user, i) => (
            <li key={i}>{user}</li>
          ))}
        </ul>
      ) : (
        <p>No Users to display</p>
      )}
      <br />
    </article>
  );
};

export default Users;
