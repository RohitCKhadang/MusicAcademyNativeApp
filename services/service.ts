import { axiosAuthInstance } from "./axiosInterference";

export const loginApi = async (data: { emailId: string; password: string }) => {
  return axiosAuthInstance.post("/auth/login", data);
};

export const signupApi = async (data: any) => {
  return axiosAuthInstance.post("/auth/signup", data);
};

export const courseDropdownApi = async () => {
  return axiosAuthInstance.get("/auth/course");
};

export const fetchUsersApi = async () => {
  return axiosAuthInstance.get("/auth/userView");
};
