import { formatDistanceToNow } from 'date-fns'

export const formatDate = (date: string) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}

export const validateComment = (content: string) => {
  return content !== ''
}
