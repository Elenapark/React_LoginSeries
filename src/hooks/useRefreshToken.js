import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const refresh = async () => {
    const response = await axios.get("/refresh", {
      withCredentials: true, // it allows us to send cookie with our request
    });
    // change accessToken with newly generated accessToken
    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log("새로운 토큰:", response.data.accessToken);
      return { ...prev, accessToken: response.data.accessToken };
    });

    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
