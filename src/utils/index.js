import axios from "axios";

const productionUrl = "http://localhost:5000/api/v1";
export const customFetch = axios.create({
  baseURL: productionUrl,
  // to allow cookies to be set in the browser
  withCredentials: true,
});
