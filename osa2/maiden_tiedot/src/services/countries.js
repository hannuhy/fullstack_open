import axios from 'axios';
import keys from '../config/dev';
const baseUrl = 'https://restcountries.eu';
const weatherUrl = `https://api.apixu.com/v1/current.json?key=${keys.apiKey}&q=`

const getAll = () => {
  const request = axios.get(`${baseUrl}/rest/v2/all`);
  return request.then(response => response.data);
}

const getWeather = (city) => {
  const request = axios.get(`${weatherUrl}${city}`);
  return request.then(response => response.data);
}

export default {
  getAll,
  getWeather
}