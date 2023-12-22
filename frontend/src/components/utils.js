import axios from 'axios';

export const registerUser = async ( userData ) => {
    return await axios.post('http://localhost:5555/signup', userData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
}

export const createRequestConfig = (data) => {
  const userData = new FormData();
  Object.keys(data).forEach((key) => {
    if (key !== "file") {
      userData.append(key, data[key]);
    }
    // else {
    //   userData.append('file', data['file'][0]);
    // }
  });

  return userData;
}

export const login = async (data) => {
  const response = await axios.post('http://localhost:5555/signin', data);
  return response.data
}
