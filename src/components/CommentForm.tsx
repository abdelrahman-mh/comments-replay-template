import React, { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../hooks'
import { addComment } from '../feature/commentSlice'
import { validateComment } from '../helper'

interface Props {}

const CommentForm: React.FC<Props> = () => {
  const [content, setContent] = useState('')
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.user)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (user && validateComment(content.trim())) {
      dispatch(addComment({ content: content.trim(), user }))
      setContent('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className='comment-form'>
      <img src={user?.image.png} alt='user-icon' className='user-icon' />
      <textarea name='content' id='content' value={content} onChange={({ target }) => setContent(target.value)} placeholder='Add a comment...'></textarea>
      <button type='submit'>SEND</button>
    </form>
  )
}

export default CommentForm
