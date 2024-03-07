import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_ENDPOINT;

export const register = async (input) => {
    const data = await axios.post(`${baseUrl}/auth/register`, input);
    return data;
}

export const registerOTP = async (input) => {
    const data = await axios.post(`${baseUrl}/auth/register-OTP`, input);
    return data;
}

export const signIn = async (input) => {
    const data = await axios.post(`${baseUrl}/auth/signin`, input);
    return data;
}

export const forgotPassword = async (input) => {
    const data = await axios.post(`${baseUrl}/auth/forgot-password`, input);
    return data;
}

export const resetPasswordOTP = async (input) => {
    const data = await axios.post(`${baseUrl}/auth/reset-pass-OTP`, input);
}

export const resetPassword = async (input) => {
    const data = await axios.post(`${baseUrl}/auth/reset-password`, input);
    return data;
}