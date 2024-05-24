import axios from 'axios';
import { Comment } from '../util/types';
import { apiUrl } from '../util/constants';

export const getComments = async () => {
  const response = await axios.get<Comment[]>(`${apiUrl}data/comments.json`);
  return response.data;
};
