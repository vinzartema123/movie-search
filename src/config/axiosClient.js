import axios from 'axios';
import constants from './constants';

const axiosClient = axios.create();

axiosClient.defaults.baseURL = constants.HOST_URL;

axiosClient.defaults.headers = constants.headers;

// To share cookies to cross site domain, change to true.
axiosClient.defaults.withCredentials = false;

export function getCustomRequest(URL) {
  return axios.get(`${URL}&api_key=${constants.API_KEY}`).then(response => response);
}

export function getRequest(URL) {
  return axiosClient.get(`${URL}&api_key=${constants.API_KEY}`).then(response => response);
}

export function postRequest(URL, payload) {
  return axiosClient.post(`${URL}&api_key=${constants.API_KEY}`, payload).then(response => response);
}

export function patchRequest(URL, payload) {
  return axiosClient.patch(`${URL}&api_key=${constants.API_KEY}`, payload).then(response => response);
}

export function deleteRequest(URL) {
  return axiosClient.delete(`${URL}&api_key=${constants.API_KEY}`).then(response => response);
}
