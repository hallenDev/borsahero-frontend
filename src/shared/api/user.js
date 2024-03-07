import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_ENDPOINT;

export const validateUsername = async (input) => {
  const data = await axios.post(`${baseUrl}/user/validate-username`, {username: input.username});
  return data;
}

export const updateProfile = async (input) => {
  const data = await axios.post(`${baseUrl}/user/update-profile`, input);
  return data;
}

export const uploadPhoto = async (input) => {
  let form_data = new FormData();
  form_data.append("file", input.file);
  const data = await axios.post(`${baseUrl}/user/upload-profile-photo`, form_data);
  return data;
}