import axios from "axios";

const newRequest = axios.create({
  //baseURL: "http://localhost:8800/api/", // DEV
  baseURL: "/api/", // PROD
  withCredentials: true,
});

export default newRequest;
