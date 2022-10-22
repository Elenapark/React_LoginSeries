import { useRef, useState, useEffect } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import useInput from "../hooks/useInput";

const LOGIN_URL = "/auth";

const Login = () => {
  const { setAuth, persist, setPersist } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  // const [user, setUser] = useLocalStorage("user", "");
  const [user, resetUser, userAttribs] = useInput("user", "");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log("/auth응답", response.data);
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ user, pwd, roles, accessToken });
      resetUser();
      setPwd("");
      // 기존에 가고자 했던 페이지로 redirect
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response || err?.message === "Network Error") {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        // 400 : info expected was not received
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        // 401 : unathorized - user does not exist
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive" // screen reader announces this message right away when foucs
      >
        {errMsg}
      </p>
      <h1>Sign In</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          // controlled input
          // onChange={(e) => setUser(e.target.value)}
          // value={user}
          {...userAttribs}
          required
          // aria label no needed!
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          // controlled input
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
        />
        <button>Sign In</button>
        <div className="persistCheck">
          <input
            type="checkbox"
            id="persist"
            onChange={togglePersist}
            checked={persist}
          />
          <label htmlFor="persist">Trust This Device</label>
        </div>
      </form>
      <p>
        Need an Account? <br />
        <span className="line">
          {/*put router link here*/}
          <a href="#">Sign Up</a>
        </span>
      </p>
    </section>
  );
};

export default Login;
