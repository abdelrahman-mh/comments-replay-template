import React, { FormEvent, useRef, useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { addReplay } from '../feature/commentSlice';
import { validateComment } from '../helper';

interface Props {
  commentId: string;
  replyingTo: string;
  close: () => void;
}

const ReplayForm: React.FC<Props> = ({ replyingTo, commentId, close }) => {
  const [content, setContent] = useState(`@${replyingTo} `);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      if (content) {
        inputRef.current.setSelectionRange(content.length, content.length);
      }
    }
  }, [content]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newContent: string = content.startsWith(`@${replyingTo} `) ? content.slice(replyingTo.length + 1).trim() : content.trim();

    if (user && validateComment(newContent)) {
      dispatch(
        addReplay({
          commentId: commentId,
          replay: {
            content: newContent,
            replyingTo: replyingTo,
            user,
          },
        })
      );
      setContent('');
      close();
    }
  };

  return (
    <form onSubmit={handleSubmit} className='replay-form'>
      <img src={user?.image.png} alt='user-icon' className='user-icon' />
      <textarea ref={inputRef} name='content' id='content' value={content} onChange={({ target }) => setContent(target.value)} placeholder='Add a reply...'></textarea>
      <button type='submit'>REPLY</button>
      <button type='button' onClick={close}>
        Cancel
      </button>
    </form>
  );
};

export default ReplayForm;
