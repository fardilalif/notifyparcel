import axios from "axios";

const productionUrl = "http://localhost:5000/api/v1";
export const customFetch = axios.create({
  baseURL: productionUrl,
  // to allow cookies to be set in the browser
  withCredentials: true,
});

export const groupBy = function (xs, key) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};
