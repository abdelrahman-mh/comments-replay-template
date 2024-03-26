import axios from 'axios';
import { User } from '../types';
import { apiUrl } from '../constants';

export const getCurrentUser = async () => {
  const response = await axios.get<User>(`${apiUrl}data/currUser.json`);
  return response.data;
};
