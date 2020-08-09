import axios from 'axios';

const doApi = (url, payload) => {
  const result = axios
    .post('http://localhost:9100/api/' + url, payload)
    .then(response => {
      return {
        status: 'success',
        data: response,
      };
    })
    .catch(error => {
      return {
        status: 'error',
        data: error.response.status,
      };
    });
  return result;
};

export default doApi;
