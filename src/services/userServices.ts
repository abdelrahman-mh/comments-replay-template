import axios from 'axios';
import { User } from '../util/types';
import { apiUrl } from '../util/constants';

export const getCurrentUser = async () => {
  const response = await axios.get<User>(`${apiUrl}data/currUser.json`);
  return response.data;
};
