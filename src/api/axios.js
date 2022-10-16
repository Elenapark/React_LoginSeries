import axios from "axios";
const BASE_URL = "http://localhost:3500";

export default axios.create({
  baseURL: BASE_URL,
});

// for adding axios intercepters - attach jwt tokens and retry once when get failure(403 forbidden)
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
