import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../util/hooks';
import { editComment, editReplay } from '../feature/commentSlice';
import { validateComment } from '../util/helper';
import Textarea from './Textarea';

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
    <form onSubmit={handleSubmit} className='edit-form form'>
      <Textarea value={content} onChange={({ target }) => setContent(target.value)} placeholder={`Edit your ${type === 'comment' ? 'comment' : 'reply'} here...`} />

      <div className='form__buttons'>
        <button className='confirm btn' type='submit'>
          UPDATE
        </button>
        <span className='cancel-btn' onClick={cancel}>
          Cancel
        </span>
      </div>
    </form>
  );
};

export default EditForm;
