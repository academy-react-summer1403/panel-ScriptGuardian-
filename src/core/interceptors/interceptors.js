import axios from "axios";
import { getItem, removeItem } from "../services/storage/storage.services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const baseURL = import.meta.env.VITE_BASE_URL;

const http = axios.create({
  baseURL: baseURL,
});

const onSuccess = (response) => {
  console.log("interceptor", response);
  if (response.data.success != undefined && !response.data.success) {
    console.log("toast error");
    // toast(response.data.message);
  } else if (response.data.success != undefined && response.data.success) {
    console.log("toast info");
    // toast(response.data.message);
  }
  return response.data;
};

const onError = (err) => {
  console.log("interceptor", err);
  if (err.response.status === 401) {
    window.location.pathname = "/";
    removeItem("token");
  }
  if (err.response.status >= 400 && err.response.status < 500) {
    // alert("Client error: " + err.response.status);
  }

  return Promise.reject(err);
};

http.interceptors.response.use(onSuccess, onError);

http.interceptors.request.use((opt) => {
  const token = getItem("token");
  if (token) opt.headers.Authorization = "Bearer " + token;
  return opt;
});

export default http;
