import axios from 'axios';
import { BASE_URL } from '../constants/api.config';

export const apiClient = axios.create({
  baseURL: BASE_URL,
});
