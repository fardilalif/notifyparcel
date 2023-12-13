import axios from "axios";
import day from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat.js";
day.extend(localizedFormat);

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

export const formatDate = (date) => date && day(date).format("llll");

export const formatCurrency = (currency) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "MYR",

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  }).format(currency);
