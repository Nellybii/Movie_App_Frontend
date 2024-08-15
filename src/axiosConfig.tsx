// axiosConfig.ts
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://moviestore-7f90835bf12e.herokuapp.com/',
});

export default instance;
