import { useState, useEffect } from "react";
import axios from "../api/axios";

const Users = () => {
  const [users, setUsers] = useState();

  useEffect(() => {
    let isMounted = true;
    // cancel pending request when we componente unmounts
    const controller = new AbortController();
    const getUsers = async () => {
      try {
        const response = await axios.get("/users", {
          signal: controller.signal,
        });
        console.log("/users응답", response.data);
        isMounted && setUsers(response.data);
      } catch (err) {
        console.error(err);
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
            <li key={i}>{user?.username}</li>
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
