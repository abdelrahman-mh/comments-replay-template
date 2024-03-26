import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { addComment } from '../feature/commentSlice';
import { validateComment } from '../helper';
import Textarea from './Textarea';

interface Props {}

const CommentForm: React.FC<Props> = () => {
  const [content, setContent] = useState('');
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (user && validateComment(content.trim())) {
      dispatch(addComment({ content: content.trim(), user }));
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='comment-form form card-item'>
      <img src={user?.image.png} alt='user-icon' className='form__image' />
      <Textarea value={content} onChange={({ target }) => setContent(target.value)} placeholder='Add a comment...' />
      <div className='form__buttons'>
        <button className='btn confirm' type='submit'>
          SEND
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
