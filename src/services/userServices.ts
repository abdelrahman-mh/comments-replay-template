import axios from 'axios';
import { User } from '../types';

export const getCurrentUser = async () => {
  const response = await axios.get<User>('/data/currUser.json');
  return response.data;
};
