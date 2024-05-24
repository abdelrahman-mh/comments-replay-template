import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../util/hooks';
import { editPost } from '../feature/commentSlice';
import { validateComment } from '../util/helper';
import Textarea from './Textarea';

interface Props {
  isComment: boolean;
  parentCommentId?: string;
  postId: string;
  replyingTo?: string;
  content: string;
  cancel?: () => void;
}

const EditForm: React.FC<Props> = ({ isComment, parentCommentId, postId, cancel, content: contentToEdit, replyingTo }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const [content, setContent] = useState(!isComment && replyingTo ? `@${replyingTo} ${contentToEdit}` : contentToEdit);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newContent: string = !isComment && replyingTo && content.startsWith(`@${replyingTo} `) ? content.slice(replyingTo.length + 1).trim() : content.trim();

    if (!user || !validateComment(newContent)) return;

    dispatch(editPost({ parentCommentId, postId, newContent }));
    cancel && cancel();
  };

  return (
    <form onSubmit={handleSubmit} className="edit-form form">
      <Textarea value={content} onChange={({ target }) => setContent(target.value)} placeholder={`Edit your ${isComment ? 'comment' : 'reply'} here...`} />

      <div className="form__buttons">
        <button className="confirm btn" type="submit">
          UPDATE
        </button>
        <span className="cancel-btn" onClick={cancel}>
          Cancel
        </span>
      </div>
    </form>
  );
};

export default EditForm;
