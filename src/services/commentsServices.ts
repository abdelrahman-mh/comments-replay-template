import axios from 'axios'
import { Comment } from '../types'

export const getComments = async () => {
  const response = await axios.get<Comment[]>('/data/comments.json')
  return response.data
}
