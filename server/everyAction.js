import axios from 'axios';

import config from "./config/environment";

export const everyAction = axios.create({
  baseURL: "https://api.securevan.com/v4",
  headers: {
     "Accept": "application/json",
     "Content-Type": "application/json",
  },
  auth: {
    username: config.everyAction.appName,
    password: config.everyAction.apiKey,
  },
});
