import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { API_BASE_URL } from "./api";
// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,

});
export const getToken = async () => {
  return await SecureStore.getItemAsync("authToken");
};
// You can add interceptors or other configurations here if needed
axiosInstance.interceptors.request.use((config:any) => {
  // You can modify the request config here if needed
  config.headers = {
    ...config.headers,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${getToken}`, // Replace with actual token retrieval logic
  };
  
  return config;
}, error => {
  return Promise.reject(error);
});

//Auth 
const axiosAuthInstance = axios.create({
  baseURL: API_BASE_URL,

});

axiosAuthInstance.interceptors.request.use((config:any) => {
  // You can modify the request config here if needed
  config.headers = {
    ...config.headers,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    
  };
  
  return config;
}, error => {
  return Promise.reject(error);
});
export { axiosAuthInstance, axiosInstance };

