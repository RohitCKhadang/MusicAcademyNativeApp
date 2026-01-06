import { axiosAuthInstance } from "./axiosInterference";


export const loginApi = async (data: {
  emailId: string;
  password: string;
}) => {
  return axiosAuthInstance.post('/auth/login', data);
};
