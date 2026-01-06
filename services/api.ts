export const API_BASE_URL = process.env.EXPO_PUBLIC_BASE_URL || 'http://localhost:8080';

//Login Url
export const LOGIN_URL = `${API_BASE_URL}/auth/login`;

//Signup Url
export const SIGNUP_URL = `${API_BASE_URL}/auth/signup`;
