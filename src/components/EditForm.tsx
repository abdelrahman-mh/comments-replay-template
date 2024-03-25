import React, { useState, useRef, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { editComment, editReplay } from '../feature/commentSlice';
import { validateComment } from '../helper';

interface Props {
  type: 'comment' | 'reply';
  replayId?: string;
  commentId: string;
  replyingTo?: string;
  content: string;
  cancel?: () => void;
}

const EditForm: React.FC<Props> = ({ type, replayId, cancel, commentId, content: contentToEdit, replyingTo }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const [content, setContent] = useState(type === 'reply' && replyingTo ? `@${replyingTo} ${contentToEdit}` : contentToEdit);

  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      if (content) {
        inputRef.current.setSelectionRange(content.length, content.length);
      }
    }
  }, [content]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newContent: string = type === 'reply' && replyingTo && content.startsWith(`@${replyingTo} `) ? content.slice(replyingTo.length + 1).trim() : content.trim();

    if (!user || !validateComment(newContent)) return;

    if (type === 'comment') {
      dispatch(editComment({ content: newContent, id: commentId }));
    } else if (type === 'reply' && replayId) {
      dispatch(editReplay({ commentId, replayId, content: newContent }));
    }
    cancel && cancel();
  };

  return (
    <form onSubmit={handleSubmit} className='edit-form'>
      <textarea
        ref={inputRef}
        name='content'
        id='content'
        value={content}
        onChange={({ target }) => setContent(target.value)}
        placeholder={`Edit your ${type === 'comment' ? 'comment' : 'reply'} here...`}></textarea>
      <button type='submit'>UPDATE</button>
      <button onClick={cancel}>Cancel</button>
    </form>
  );
};

export default EditForm;
