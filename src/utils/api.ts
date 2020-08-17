import axios from 'axios';
const token = localStorage.getItem('token');
const config = {
  headers: { Authorization: `Bearer ${token}` },
};
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

const postApi = (url, payload) => {
  const result = axios
    .post('http://localhost:9100/api/' + url, payload, config)
    .then(response => {
      return {
        status: 'success',
        data: response,
      };
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      return {
        status: 'error',
        data: error.response.status,
      };
    });
  return result;
};

const putApi = (url, payload) => {
  const result = axios
    .put('http://localhost:9100/api/' + url, payload, config)
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

export { doApi, putApi, postApi };
