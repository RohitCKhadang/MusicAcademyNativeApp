import axios from "axios";
const API_URL = "https://your-api.com";

export const getStudents = async () => {
  const res = await axios.get(`${API_URL}/students`);
  return res.data;
};
