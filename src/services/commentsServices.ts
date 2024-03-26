import axios from 'axios';
import { Comment } from '../types';
import { apiUrl } from '../constants';

export const getComments = async () => {
  const response = await axios.get<Comment[]>(`${apiUrl}data/comments.json`);
  return response.data;
};
